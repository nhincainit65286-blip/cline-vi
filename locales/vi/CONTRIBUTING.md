# Đóng góp cho Cline

Chúng tôi rất vui vì bạn quan tâm đến việc đóng góp cho Cline. Dù bạn sửa lỗi, thêm tính năng hay cải thiện tài liệu, mỗi đóng góp đều khiến Cline thông minh hơn! Để giữ cộng đồng của chúng tôi sôi nổi và chào đón, tất cả thành viên phải tuân thủ [Quy tắc ứng xử](CODE_OF_CONDUCT.md) của chúng tôi.

## Báo cáo lỗi hoặc vấn đề

Báo cáo lỗi giúp Cline tốt hơn cho tất cả mọi người! Trước khi tạo vấn đề mới, vui lòng [tìm kiếm các vấn đề hiện có](https://github.com/cline/cline/issues) để tránh trùng lặp. Khi bạn sẵn sàng báo cáo lỗi, hãy đến [trang vấn đề](https://github.com/cline/cline/issues/new/choose) của chúng tôi, nơi bạn sẽ tìm thấy mẫu để giúp bạn điền thông tin liên quan.

<blockquote class='warning-note'>
    🔐 <b>Quan trọng:</b> Nếu bạn phát hiện lỗ hổng bảo mật, vui lòng báo cáo riêng tư bằng <a href="https://github.com/cline/cline/security/advisories/new">Công cụ bảo mật Github</a>.
</blockquote>

## Quyết định việc cần làm

Tìm kiếm một first contribution tốt? Xem các vấn đề được đánh dấu ["good first issue"](https://github.com/cline/cline/labels/good%20first%20issue) hoặc ["help wanted"](https://github.com/cline/cline/labels/help%20wanted). Đây là những lĩnh vực được chọn lọc đặc biệt cho người đóng góp mới và chúng tôi rất hoan nghênh sự giúp đỡ của bạn!

Chúng tôi cũng hoan nghênh đóng góp vào [tài liệu](https://github.com/cline/cline/tree/main/docs) của chúng tôi! Dù sửa lỗi chính tả, cải thiện hướng dẫn hiện có hay tạo nội dung giáo dục mới - chúng tôi muốn xây dựng một nguồn tài nguyên do cộng đồng điều hướng để giúp mọi người tận dụng tối đa Cline. Bạn có thể bắt đầu bằng cách đi sâu vào `/docs` và tìm những nơi cần cải thiện.

Nếu bạn có kế hoạch phát triển một tính năng lớn hơn, trước tiên hãy tạo [yêu cầu tính năng](https://github.com/cline/cline/discussions/categories/feature-requests?discussions_q=is%3Aopen+category%3A%22Feature+Requests%22+sort%3Atop) để chúng tôi có thể thảo luận xem nó có phù hợp với tầm nhìn của Cline hay không.

## Thiết lập môi trường phát triển

1. **VS Code Extension**

    - Khi mở dự án, VS Code sẽ nhắc bạn cài đặt các extension được đề xuất
    - Các extension này cần thiết cho việc phát triển - vui lòng chấp nhận tất cả lời nhắc cài đặt
    - Nếu bạn bỏ qua lời nhắc, có thể cài đặt thủ công từ panel extension

2. **Phát triển cục bộ**
    - Chạy `npm run install:all` để cài đặt các phụ thuộc
    - Chạy `npm run test` để chạy tests cục bộ
    - Trước khi commit PR, chạy `npm run format:fix` để định dạng code

## Viết và gửi code

Bất kỳ ai cũng có thể đóng góp code cho Cline, nhưng chúng tôi yêu cầu bạn tuân thủ các hướng dẫn sau để đảm bảo đóng góp của bạn được tích hợp suôn sẻ:

1. **Giữ Pull Request tập trung**

    - Giới hạn PR cho một tính năng hoặc sửa lỗi duy nhất
    - Chia các thay đổi lớn thành các PR nhỏ hơn, liên quan
    - Chia thay đổi thành các commit logic để xem xét độc lập

2. **Chất lượng code**

    - Chạy `npm run lint` để kiểm tra code style
    - Chạy `npm run format` để tự động định dạng code
    - Tất cả PR phải pass CI checks, bao gồm lint và format
    - Giải quyết tất cả ESLint warnings hoặc errors trước khi commit
    - Tuân thủ TypeScript best practices và giữ type safety

3. **Tests**

    - Thêm tests cho tính năng mới
    - Chạy `npm test` để đảm bảo tất cả tests pass
    - Nếu thay đổi của bạn ảnh hưởng đến tests hiện có, hãy cập nhật chúng
    - Bao gồm unit tests và integration tests khi thích hợp

4. **Commit guidelines**

    - Viết commit messages rõ ràng, mô tả
    - Sử dụng conventional commit format (ví dụ: "feat:", "fix:", "docs:")
    - Tham chiếu các vấn đề liên quan trong commit, sử dụng #issue-number

5. **Trước khi submit**

    - Rebase branch của bạn với main mới nhất
    - Đảm bảo branch của bạn build thành công
    - Kiểm tra kỹ tất cả tests có pass không
    - Kiểm tra xem thay đổi của bạn có debug code hay console logs không

6. **Mô tả Pull Request**
    - Mô tả rõ ràng thay đổi của bạn
    - Bao gồm các bước để test thay đổi
    - Liệt kê bất kỳ breaking changes nào
    - Đối với UI changes, thêm screenshots

## Đóng góp Agreement

Bằng cách gửi pull request, bạn đồng ý rằng đóng góp của bạn sẽ được cấp phép theo cùng giấy phép với dự án ([Apache 2.0](LICENSE)).

Nhớ rằng: Đóng góp cho Cline không chỉ là viết code - đó là trở thành một phần của cộng đồng, cùng định hình tương lai của phát triển được hỗ trợ bởi AI. Hãy cùng nhau xây dựng những thứ tuyệt vời! 🚀
