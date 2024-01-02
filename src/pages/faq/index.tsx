import './index.css'

export default function FAQ() {
  return (
    <section id='faq' className='faq section-bg'>
      <div className='container'>
        <div className='section-title'>
          <h2>Các câu hỏi thường gặp</h2>
        </div>

        <div className='faq-list'>
          <ul>
            <li data-aos='fade-up'>
              <i className='bx bx-help-circle icon-help'></i>
              <a data-bs-toggle='collapse' className='collapse' data-bs-target='#faq-list-1'>
                Sức khỏe tâm thần là gì?
                <i className='bx bx-chevron-down icon-show'></i>
                <i className='bx bx-chevron-up icon-close'></i>
              </a>
              <div id='faq-list-1' className='collapse show' data-bs-parent='.faq-list'>
                <p>
                  Là tình trạng cảm xúc, tâm lý và xã hội của một người. Nó ảnh hưởng đến cách những cá nhân suy nghĩ,
                  cảm nhận và hành động, và nó cũng ảnh hưởng đến cách họ đối phó với căng thẳng, giao tiếp với người
                  khác và đưa ra quyết định.
                </p>
              </div>
            </li>

            <li data-aos='fade-up' data-aos-delay='100'>
              <i className='bx bx-help-circle icon-help'></i>
              <a data-bs-toggle='collapse' data-bs-target='#faq-list-2' className='collapsed'>
                Những rối loạn sức khỏe tâm thần phổ biến là gì?
                <i className='bx bx-chevron-down icon-show'></i>
                <i className='bx bx-chevron-up icon-close'></i>
              </a>
              <div id='faq-list-2' className='collapse' data-bs-parent='.faq-list'>
                <p>
                  Bao gồm trầm cảm, rối loạn lo âu (như rối loạn lo âu chung, rối loạn hoảng loạn và rối loạn lo âu xã
                  hội), rối loạn lưỡng cực, rối loạn căng thẳng sau chấn thương (PTSD) và rối loạn ăn uống (như chứng
                  biếng ăn và chứng ăn quá nhiều), cùng với những rối loạn khác.
                </p>
              </div>
            </li>

            <li data-aos='fade-up' data-aos-delay='200'>
              <i className='bx bx-help-circle icon-help'></i>
              <a data-bs-toggle='collapse' data-bs-target='#faq-list-3' className='collapsed'>
                Những dấu hiệu và triệu chứng của các vấn đề sức khỏe tâm thần là gì?{' '}
                <i className='bx bx-chevron-down icon-show'></i>
                <i className='bx bx-chevron-up icon-close'></i>
              </a>
              <div id='faq-list-3' className='collapse' data-bs-parent='.faq-list'>
                <p>
                  Những dấu hiệu và triệu chứng của các vấn đề sức khỏe tâm thần khác nhau tùy thuộc vào rối loạn cụ thể
                  nhưng có thể bao gồm sự buồn bã hoặc thay đổi tâm trạng liên tục, lo lắng quá mức hoặc sợ hãi, khó tập
                  trung, thay đổi khẩu phần ăn hoặc mẫu giấc ngủ, rút lui khỏi các hoạt động hoặc giao tiếp xã hội, và ý
                  nghĩ tự làm tổn thương hoặc tự sát.
                </p>
              </div>
            </li>

            <li data-aos='fade-up' data-aos-delay='300'>
              <i className='bx bx-help-circle icon-help'></i>
              <a data-bs-toggle='collapse' data-bs-target='#faq-list-4' className='collapsed'>
                Làm thế nào để hỗ trợ ai đó có một điều kiện sức khỏe tâm thần?
                <i className='bx bx-chevron-down icon-show'></i>
                <i className='bx bx-chevron-up icon-close'></i>
              </a>
              <div id='faq-list-4' className='collapse' data-bs-parent='.faq-list'>
                <p>
                  Hỗ trợ ai đó có một điều kiện sức khỏe tâm thần bao gồm thể hiện sự thông cảm, lắng nghe mà không phán
                  xét, khuyến khích họ tìm kiếm sự giúp đỡ chuyên nghiệp, và cung cấp sự hỗ trợ thiết thực. Điều quan
                  trọng là bạn phải tự học về điều kiện của họ, giao tiếp một cách mở rộng, và kiên nhẫn và thông cảm.
                </p>
              </div>
            </li>

            <li data-aos='fade-up' data-aos-delay='400'>
              <i className='bx bx-help-circle icon-help'></i>
              <a data-bs-toggle='collapse' data-bs-target='#faq-list-5' className='collapsed'>
                Những thực hành chăm sóc bản thân để duy trì sức khỏe tâm thần tốt là gì?
                <i className='bx bx-chevron-down icon-show'></i>
                <i className='bx bx-chevron-up icon-close'></i>
              </a>
              <div id='faq-list-5' className='collapse' data-bs-parent='.faq-list'>
                <p>
                  Những thực hành chăm sóc bản thân để duy trì sức khỏe tâm thần tốt bao gồm tham gia vào các hoạt động
                  vận động thường xuyên, thực hành các kỹ thuật thư giãn (như hít thở sâu hoặc thiền), có đủ giấc ngủ,
                  duy trì một chế độ ăn uống cân bằng, nuôi dưỡng các mối quan hệ xã hội, thiết lập ranh giới, và tham
                  gia vào các hoạt động mang lại niềm vui và sự trọn vẹn.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
