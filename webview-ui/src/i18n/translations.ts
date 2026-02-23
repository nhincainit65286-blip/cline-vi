export type Language = "en" | "vi"

export interface Translations {
	navbar: {
		chat: string
		mcp: string
		history: string
		account: string
		settings: string
		newTask: string
		mcpServers: string
	}
	chat: {
		placeholder: string
		send: string
		stop: string
	}
	settings: {
		title: string
		general: string
		models: string
		apiKeys: string
		theme: string
		language: string
	}
	common: {
		save: string
		cancel: string
		delete: string
		edit: string
		close: string
		confirm: string
		loading: string
		error: string
		success: string
	}
}

export const translations: Record<Language, Translations> = {
	en: {
		navbar: {
			chat: "Chat",
			mcp: "MCP",
			history: "History",
			account: "Account",
			settings: "Settings",
			newTask: "New Task",
			mcpServers: "MCP Servers",
		},
		chat: {
			placeholder: "Enter a task for Cline...",
			send: "Send",
			stop: "Stop",
		},
		settings: {
			title: "Settings",
			general: "General",
			models: "Models",
			apiKeys: "API Keys",
			theme: "Theme",
			language: "Language",
		},
		common: {
			save: "Save",
			cancel: "Cancel",
			delete: "Delete",
			edit: "Edit",
			close: "Close",
			confirm: "Confirm",
			loading: "Loading...",
			error: "Error",
			success: "Success",
		},
	},
	vi: {
		navbar: {
			chat: "Trò chuyện",
			mcp: "MCP",
			history: "Lịch sử",
			account: "Tài khoản",
			settings: "Cài đặt",
			newTask: "Tác vụ mới",
			mcpServers: "Máy chủ MCP",
		},
		chat: {
			placeholder: "Nhập tác vụ cho Cline...",
			send: "Gửi",
			stop: "Dừng",
		},
		settings: {
			title: "Cài đặt",
			general: "Chung",
			models: "Mô hình",
			apiKeys: "API Keys",
			theme: "Giao diện",
			language: "Ngôn ngữ",
		},
		common: {
			save: "Lưu",
			cancel: "Hủy",
			delete: "Xóa",
			edit: "Sửa",
			close: "Đóng",
			confirm: "Xác nhận",
			loading: "Đang tải...",
			error: "Lỗi",
			success: "Thành công",
		},
	},
}
