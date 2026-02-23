import axios, { AxiosInstance } from "axios"
import { SimpleGit, simpleGit } from "simple-git"
import { Logger } from "@/shared/services/Logger"

export interface GitHubConfig {
	token?: string
	owner: string
	repo: string
}

export interface CreatePROptions {
	title: string
	body: string
	head: string
	base: string
	draft?: boolean
}

export interface PRInfo {
	number: number
	title: string
	body: string
	state: string
	htmlUrl: string
	head: string
	base: string
}

export interface CommitInfo {
	sha: string
	message: string
	author: string
	date: string
}

export class GitHubService {
	private static instance: GitHubService
	private api: AxiosInstance | null = null
	private git: SimpleGit | null = null
	private config: GitHubConfig | null = null

	static getInstance(): GitHubService {
		if (!GitHubService.instance) {
			GitHubService.instance = new GitHubService()
		}
		return GitHubService.instance
	}

	initialize(config: GitHubConfig): void {
		this.config = config
		if (config.token) {
			this.api = axios.create({
				baseURL: "https://api.github.com",
				headers: {
					Authorization: `token ${config.token}`,
					Accept: "application/vnd.github.v3+json",
				},
			})
		}
		Logger.log("[GitHubService] Initialized")
	}

	async initializeGit(workspacePath: string): Promise<void> {
		this.git = simpleGit(workspacePath)
		Logger.log(`[GitHubService] Git initialized at: ${workspacePath}`)
	}

	async getCurrentBranch(): Promise<string> {
		if (!this.git) throw new Error("Git not initialized")
		const status = await this.git.status()
		return status.current || "main"
	}

	async createBranch(branchName: string, baseBranch?: string): Promise<void> {
		if (!this.git) throw new Error("Git not initialized")

		const currentBranch = await this.getCurrentBranch()

		if (baseBranch && baseBranch !== currentBranch) {
			await this.git.checkout(baseBranch)
		}

		await this.git.checkoutLocalBranch(branchName)
		Logger.log(`[GitHubService] Created branch: ${branchName}`)
	}

	async commit(message: string): Promise<string> {
		if (!this.git) throw new Error("Git not initialized")

		await this.git.add(".")
		const result = await this.git.commit(message)
		Logger.log(`[GitHubService] Committed: ${message}`)
		return result.commit
	}

	async push(branchName?: string): Promise<void> {
		if (!this.git) throw new Error("Git not initialized")

		const branch = branchName || (await this.getCurrentBranch())
		await this.git.push(["-u", "origin", branch])
		Logger.log(`[GitHubService] Pushed branch: ${branch}`)
	}

	async createPullRequest(options: CreatePROptions): Promise<PRInfo> {
		if (!this.api || !this.config) {
			throw new Error("GitHub API not initialized. Please provide a token.")
		}

		const response = await this.api.post(`/repos/${this.config.owner}/${this.config.repo}/pulls`, {
			title: options.title,
			body: options.body,
			head: options.head,
			base: options.base,
			draft: options.draft || false,
		})

		const pr: PRInfo = {
			number: response.data.number,
			title: response.data.title,
			body: response.data.body,
			state: response.data.state,
			htmlUrl: response.data.html_url,
			head: response.data.head.ref,
			base: response.data.base.ref,
		}

		Logger.log(`[GitHubService] Created PR #${pr.number}: ${pr.htmlUrl}`)
		return pr
	}

	async getPullRequest(prNumber: number): Promise<PRInfo | null> {
		if (!this.api || !this.config) {
			throw new Error("GitHub API not initialized")
		}

		try {
			const response = await this.api.get(`/repos/${this.config.owner}/${this.config.repo}/pulls/${prNumber}`)

			return {
				number: response.data.number,
				title: response.data.title,
				body: response.data.body,
				state: response.data.state,
				htmlUrl: response.data.html_url,
				head: response.data.head.ref,
				base: response.data.base.ref,
			}
		} catch (error) {
			Logger.error(`[GitHubService] Failed to get PR #${prNumber}:`, error)
			return null
		}
	}

	async listPullRequests(state: "open" | "closed" | "all" = "open"): Promise<PRInfo[]> {
		if (!this.api || !this.config) {
			throw new Error("GitHub API not initialized")
		}

		const response = await this.api.get(`/repos/${this.config.owner}/${this.config.repo}/pulls`, { params: { state } })

		return response.data.map((pr: Record<string, unknown>) => ({
			number: pr.number,
			title: pr.title,
			body: pr.body,
			state: pr.state,
			htmlUrl: pr.html_url,
			head: (pr.head as Record<string, unknown>)?.ref as string,
			base: (pr.base as Record<string, unknown>)?.ref as string,
		}))
	}

	async mergePullRequest(prNumber: number, method: "merge" | "squash" | "rebase" = "merge"): Promise<boolean> {
		if (!this.api || !this.config) {
			throw new Error("GitHub API not initialized")
		}

		try {
			await this.api.put(`/repos/${this.config.owner}/${this.config.repo}/pulls/${prNumber}/merge`, {
				merge_method: method,
			})
			Logger.log(`[GitHubService] Merged PR #${prNumber}`)
			return true
		} catch (error) {
			Logger.error(`[GitHubService] Failed to merge PR #${prNumber}:`, error)
			return false
		}
	}

	async getRecentCommits(branch: string, limit = 10): Promise<CommitInfo[]> {
		if (!this.api || !this.config) {
			throw new Error("GitHub API not initialized")
		}

		const response = await this.api.get(`/repos/${this.config.owner}/${this.config.repo}/commits`, {
			params: { sha: branch, per_page: limit },
		})

		return response.data.map((commit: Record<string, unknown>) => ({
			sha: commit.sha,
			message: (commit.commit as Record<string, unknown>)?.message,
			author: ((commit.commit as Record<string, unknown>)?.author as Record<string, unknown>)?.name,
			date: ((commit.commit as Record<string, unknown>)?.author as Record<string, unknown>)?.date,
		}))
	}

	isConfigured(): boolean {
		return this.api !== null && this.config !== null
	}
}
