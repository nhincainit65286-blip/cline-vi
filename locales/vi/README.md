# Cline

<p align="center">
    <img src="https://media.githubusercontent.com/media/cline/cline/main/assets/docs/demo.gif" width="100%" />
</p>

<div align="center">
<table>
<tbody>
<td align="center">
<a href="https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev" target="_blank"><strong>Tải xuống từ VS Marketplace</strong></a>
</td>
<td align="center">
<a href="https://discord.gg/cline" target="_blank"><strong>Discord</strong></a>
</td>
<td align="center">
<a href="https://www.reddit.com/r/cline/" target="_blank"><strong>r/cline</strong></a>
</td>
<td align="center">
<a href="https://github.com/cline/cline/discussions/categories/feature-requests?discussions_q=is%3Aopen+category%3A%22Feature+Requests%22+sort%3Atop" target="_blank"><strong>Yêu cầu tính năng</strong></a>
</td>
<td align="center">
<a href="https://docs.cline.bot/getting-started/for-new-coders" target="_blank"><strong>Hướng dẫn cho người mới</strong></a>
</td>
</tbody>
</table>
</div>

Gặp gỡ Cline — một trợ lý AI có thể sử dụng **terminal** và **trình soạn thảo** của bạn.

Nhờ vào [khả năng lập trình proxy của Claude 4 Sonnet](https://www.anthropic.com/claude/sonnet), Cline có thể xử lý từng bước các tác vụ phát triển phần mềm phức tạp. Với một bộ công cụ, anh ấy có thể tạo và chỉnh sửa tệp, duyệt các dự án lớn, sử dụng trình duyệt và thực thi lệnh terminal sau khi được bạn cho phép, cung cấp sự hỗ trợ vượt xa việc hoàn thành mã hoặc hỗ trợ kỹ thuật. Cline thậm chí có thể sử dụng Model Context Protocol (MCP) để tạo công cụ mới và mở rộng khả năng của chính mình. Trong khi các tập lệnh AI tự động truyền thống thường chạy trong môi trường hộp cát, tiện mở rộng này cung cấp giao diện đồ họa (GUI) để con người xem xét và phê duyệt mọi thay đổi tệp và lệnh terminal, mang đến một cách an toàn và dễ sử dụng để khám phá tiềm năng của AI proxy.

1. Nhập tác vụ của bạn và thêm hình ảnh để chuyển đổi giao diện nguyên mẫu (mockup) thành ứng dụng hoạt động, hoặc sửa lỗi bằng ảnh chụp màn hình.
2. Cline bắt đầu bằng việc phân tích cấu trúc tệp và cây cú pháp trừu tượng (AST) của mã nguồn, đồng thời thực hiện tìm kiếm regex và đọc các tệp liên quan để nhanh chóng làm quen với ngữ cảnh dự án. Bằng cách quản lý tinh tế thông tin được đưa vào ngữ cảnh, Cline có thể hỗ trợ hiệu quả ngay cả các dự án lớn và phức tạp mà không vượt quá giới hạn cửa sổ ngữ cảnh.
3. Khi có thông tin cần thiết, Cline có thể:
   - Tạo và chỉnh sửa tệp, đồng thời theo dõi lỗi linter hoặc trình biên dịch, chủ động sửa các vấn đề như thiếu import, lỗi cú pháp, v.v.
   - Thực thi lệnh trực tiếp trong terminal của bạn và theo dõi đầu ra trong quá trình chạy, ví dụ như tự động phản hồi các vấn đề máy chủ phát triển sau khi sửa tệp.
   - Đối với các tác vụ phát triển web, Cline có thể mở trang web trong trình duyệt không đầu, thực hiện các thao tác như nhấp, nhập, cuộn và thu thập ảnh chụp màn hình cùng nhật ký console để sửa lỗi thời gian chạy và vấn đề giao diện.
4. Khi hoàn thành tác vụ, Cline sẽ hiển thị kết quả cho bạn bằng lệnh terminal như `open -a "Google Chrome" index.html`, bạn chỉ cần nhấn nút để thực thi.

> [!TIP]
> Sử dụng phím tắt `CMD/CTRL + Shift + P` để mở bảng lệnh và nhập "Cline: Open In New Tab" để mở tiện mở rộng dưới dạng tab trong trình soạn thảo. Điều này cho phép bạn sử dụng Cline song song với trình duyệt tệp, nhìn rõ hơn cách anh ấy thay đổi không gian làm việc của bạn.

---

<img align="right" width="340" src="https://github.com/user-attachments/assets/3cf21e04-7ce9-4d22-a7b9-ba2c595e88a4">

### Sử dụng bất kỳ API và mô hình nào

Cline hỗ trợ các nhà cung cấp API như OpenRouter, Anthropic, OpenAI, Google Gemini, AWS Bedrock, Azure và GCP Vertex. Bạn cũng có thể định cấu hết bất kỳ API nào tương thích với OpenAI hoặc sử dụng mô hình cục bộ thông qua LM Studio/Ollama. Nếu bạn sử dụng OpenRouter, tiện mở rộng sẽ lấy danh sách mô hình mới nhất của họ, cho phép bạn sử dụng ngay khi có mô hình mới.

Ngoài ra, tiện mở rộng còn theo dõi tổng số token và chi phí API cho toàn bộ tác vụ cũng như mỗi yêu cầu, đảm bảo bạn biết rõ chi phí ở mọi bước.

<!-- Pixel trong suốt để tạo ngắt dòng sau hình ảnh nổi -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="left" width="370" src="https://github.com/user-attachments/assets/81be79a8-1fdb-4028-9129-5fe055e01e76">

### Chạy lệnh trong terminal

Nhờ [cập nhật tích hợp terminal shell mới trong VSCode v1.93](https://code.visualstudio.com/updates/v1_93#_terminal-shell-integration-api), Cline có thể thực thi lệnh trực tiếp trong terminal của bạn và nhận đầu ra. Điều này cho phép anh ấy thực hiện nhiều tác vụ, từ cài đặt gói và chạy tập lệnh build đến triển khai ứng dụng, quản lý cơ sở dữ liệu và chạy thử nghiệm, đồng thời thích ứng với môi trường và chuỗi công cụ phát triển của bạn để hoàn thành công việc đúng cách.

Đối với các quy trình chạy lâu như máy chủ phát triển, hãy sử dụng nút "Continue Running" để Cline tiếp tục tác vụ trong khi lệnh chạy ngầm. Khi Cline đang làm việc, anh ấy sẽ nhận được thông báo về bất kỳ đầu terminal mới nào trong quá trình, cho phép anh ấy phản ứng với các vấn đề có thể xảy ra, chẳng hạn như lỗi biên dịch khi chỉnh sửa tệp.

<!-- Pixel trong suốt để tạo ngắt dòng sau hình ảnh nổi -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="right" width="400" src="https://github.com/user-attachments/assets/c5977833-d9b8-491e-90f9-05f9cd38c588">

### Tạo và chỉnh sửa tệp

Cline có thể tạo và chỉnh sửa tệp trực tiếp trong trình soạn thảo của bạn, hiển thị cho bạn chế độ xem khác biệt của các thay đổi. Bạn có thể chỉnh sửa hoặc khôi phục các thay đổi của Cline trong trình chỉnh sửa chế độ xem khác biệt, hoặc cung cấp phản hồi trong cuộc trò chuyện cho đến khi bạn hài lòng với kết quả. Cline cũng theo dõi lỗi linter/trình biên dịch (thiếu import, lỗi cú pháp, v.v.) để anh ấy có thể tự sửa các vấn đề phát sinh trong quá trình.

Tất cả các thay đổi Cline thực hiện được ghi lại trong dòng thời gian tệp của bạn, cung cấp một cách đơn giản để theo dõi và khôi phục các sửa đổi (nếu cần).

<!-- Pixel trong suốt để tạo ngắt dòng sau hình ảnh nổi -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="left" width="370" src="https://github.com/user-attachments/assets/bc2e85ba-dfeb-4fe6-9942-7cfc4703cbe5">

### Sử dụng trình duyệt

Nhờ tính năng [sử dụng máy tính](https://www.anthropic.com/news/3-5-models-and-computer-use) mới của Claude 4 Sonnet, Cline có thể khởi động trình duyệt, nhấp vào phần tử, nhập văn bản và cuộn, chụp ảnh màn hình và nhật ký console ở mỗi bước. Điều này cho phép gỡ lỗi tương tác, kiểm tra đầu cuối, thậm chí là sử dụng web chung! Nó cho phép anh ấy tự động sửa lỗi thị giác và vấn đề thời gian chạy mà không cần bạn thao tác thủ công và sao chép-dán nhật ký lỗi.

Hãy thử yêu cầu Cline "kiểm tra ứng dụng" để xem anh ấy chạy lệnh `npm run dev`, khởi động máy chủ phát triển cục bộ trong trình duyệt và thực hiện một loạt kiểm tra để xác nhận mọi thứ hoạt động bình thường. [Xem bản demo tại đây.](https://x.com/sdrzn/status/1850880547825823989)

<!-- Pixel trong suốt để tạo ngắt dòng sau hình ảnh nổi -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="right" width="350" src="https://github.com/user-attachments/assets/ac0efa14-5c1f-4c26-a42d-9d7c56f5fadd">

### "Thêm một công cụ..."

Nhờ [Model Context Protocol](https://github.com/modelcontextprotocol), Cline có thể mở rộng khả năng của mình bằng các công cụ tùy chỉnh. Mặc dù bạn có thể sử dụng [các máy chủ do cộng đồng tạo](https://github.com/modelcontextprotocol/servers), Cline có thể tạo và cài đặt các công cụ phù hợp với quy trình công việc cụ thể của bạn. Chỉ cần yêu cầu Cline "thêm một công cụ", anh ấy sẽ xử lý mọi thứ, từ việc tạo máy chủ MCP mới đến cài đặt nó vào tiện mở rộng. Các công cụ tùy chỉnh này sẽ trở thành một phần trong bộ công cụ của Cline, sẵn sàng sử dụng trong các tác vụ tương lai.

- "Thêm một công cụ để lấy vé Jira": Lấy mã AC của vé và để Cline bắt đầu làm việc
- "Thêm một công cụ để quản lý AWS EC2": Kiểm tra số liệu máy chủ và mở rộng/thu hẹp các phiên bản
- "Thêm một công cụ để lấy sự kiện PagerDuty mới nhất": Lấy chi tiết và để Cline sửa lỗi

<!-- Pixel trong suốt để tạo ngắt dòng sau hình ảnh nổi -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="left" width="360" src="https://github.com/user-attachments/assets/7fdf41e6-281a-4b4b-ac19-020b838b6970">

### Thêm ngữ cảnh

**`@url`:** Dán một URL để tiện mở rộng tìm nạp và chuyển đổi thành markdown, rất hữu ích khi bạn muốn cung cấp cho Cline tài liệu mới nhất

**`@problems`:** Thêm lỗi và cảnh báo không gian làm việc ("panels vấn đề") để Cline sửa

**`@file`:** Thêm nội dung tệp để bạn không phải lãng phí API yêu cầu phê duyệt đọc tệp (+ nhập để tìm kiếm tệp)

**`@folder`:** Thêm các tệp của một thư mục cùng lúc để tăng tốc quy trình công việc của bạn

<!-- Pixel trong suốt để tạo ngắt dòng sau hình ảnh nổi -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="right" width="350" src="https://github.com/user-attachments/assets/140c8606-d3bf-41b9-9a1f-4dbf0d4c90cb">

### Checkpoint: So sánh và khôi phục

Khi Cline hoàn thành tác vụ, tiện mở rộng sẽ chụp ảnh không gian làm việc của bạn ở mỗi bước. Bạn có thể sử dụng nút "Compare" để xem sự khác biệt giữa ảnh chụp và không gian làm việc hiện tại, và sử dụng nút "Restore" để khôi phục về thời điểm đó.

Ví dụ, khi sử dụng máy chủ web cục bộ, bạn có thể nhanh chóng thử các phiên bản khác nhau của ứng dụng bằng "Restore Workspace Only", sau đó sử dụng "Restore Task And Workspace" khi tìm được phiên bản để tiếp tục. Điều này cho phép bạn khám phá các phương pháp khác nhau một cách an toàn mà không mất tiến độ.

<!-- Pixel trong suốt để tạo ngắt dòng sau hình ảnh nổi -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

## Đóng góp

Để đóng góp cho dự án, hãy bắt đầu với [hướng dẫn đóng góp](CONTRIBUTING.md) của chúng tôi để hiểu những điều cơ bản. Bạn cũng có thể tham gia [Discord](https://discord.gg/cline) của chúng tôi trong kênh `#contributors` để trò chuyện với các contributor khác. Nếu bạn đang tìm kiếm công việc toàn thời gian, hãy xem các vị trí đang tuyển trên [trang tuyển dụng](https://cline.bot/join-us) của chúng tôi!

<details>
<summary>Hướng dẫn phát triển cục bộ</details>

1. Clone repository _(cần [git-lfs](https://git-lfs.com/))_:
   ```bash
   git clone https://github.com/cline/cline.git
   ```
2. Mở dự án trong VSCode:
   ```bash
   code cline
   ```
3. Cài đặt các phụ thuộc cần thiết cho tiện mở rộng và webview-gui:
   ```bash
   npm run install:all
   ```
4. Nhấn `F5` (hoặc `Run`->`Start Debugging`) để khởi động và mở cửa sổ VSCode mới với tiện mở rộng được tải. (Nếu bạn gặp vấn đề khi build dự án, có thể cần cài đặt [esbuild problem matchers extension](https://marketplace.visualstudio.com/items?itemName=connor4312.esbuild-problem-matchers))

</details>

## Giấy phép

[Apache 2.0 © 2025 Cline Bot Inc.](./LICENSE)
