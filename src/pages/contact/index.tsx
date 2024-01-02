import './index.css'

export default function Contact() {
  return (
    <section id='contact' className='contact'>
      <div className='container'>
        <div className='section-title'>
          <h2>Liên hệ</h2>
          <p>
            Chúng tôi luôn sẵn sàng lắng nghe ý kiến, góp ý và phản hồi của bạn. Nếu bạn có bất kỳ câu hỏi, yêu cầu hoặc
            đề xuất nào, xin vui lòng liên hệ với chúng tôi.
          </p>
        </div>
      </div>

      <div>
        <iframe
          style={{ border: 0, width: '100%', height: 350 }}
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61349.62160109751!2d108.16550648839126!3d16.047247302786108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c792252a13%3A0xfc14e3a044436487!2sDa%20Nang%2C%20H%E1%BA%A3i%20Ch%C3%A2u%20District%2C%20Da%20Nang%2C%20Vietnam!5e0!3m2!1sen!2s!4v1687767738151!5m2!1sen!2s'
          frameBorder={0}
          allowFullScreen
        ></iframe>
      </div>

      <div className='container'>
        <div className='row mt-5'>
          <div className='col-lg-4'>
            <div className='info'>
              <div className='address'>
                <i className='bi bi-geo-alt'></i>
                <h4>Địa chỉ:</h4>
                <p>Cam Le, Da Nang, Viet Nam</p>
              </div>

              <div className='email'>
                <i className='bi bi-envelope'></i>
                <h4>Email:</h4>
                <p>tnthang.xxxxx@vku.udn.vn</p>
              </div>

              <div className='phone'>
                <i className='bi bi-phone'></i>
                <h4>Điện thoại:</h4>
                <p>0336721xxx</p>
              </div>
            </div>
          </div>
          {/* TODO */}
          <div className='col-lg-8 mt-5 mt-lg-0'>
            <form role='form' className='php-email-form'>
              <div className='row'>
                <div className='col-md-6 form-group'>
                  <input
                    type='text'
                    name='name'
                    className='form-control'
                    id='name'
                    placeholder='Tên của bạn'
                    required
                  />
                </div>
                <div className='col-md-6 form-group mt-3 mt-md-0'>
                  <input
                    type='email'
                    className='form-control'
                    name='email'
                    id='email'
                    placeholder='Email của bạn'
                    required
                  />
                </div>
              </div>
              <div className='form-group mt-3'>
                <input
                  type='text'
                  className='form-control'
                  name='subject'
                  id='subject'
                  placeholder='Tiêu đề'
                  required
                />
              </div>
              <div className='form-group mt-3'>
                <textarea className='form-control' name='message' rows={5} placeholder='Nội dung' required></textarea>
              </div>
              <div className='my-3'>
                <div className='loading'>Loading</div>
                <div className='error-message'></div>
                <div className='sent-message'>Your message has been sent. Thank you!</div>
              </div>
              <div className='text-center'>
                <button type='submit'>Gửi đi</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
