export default function Contact() {
  const submit = (event) => {
    event.preventDefault();
    alert("ส่งข้อความเรียบร้อยแล้ว ขอบคุณที่ติดต่อ Mellow Shop");
    event.currentTarget.reset();
  };

  return (
    <main>
      <section className="page-header">
        <h1>ติดต่อเรา</h1>
        <p>
          หากต้องการข้อมูลเพิ่มเติมหรือคำแนะนำเกี่ยวกับการใช้งาน
          สามารถติดต่อได้ที่นี่
        </p>
      </section>
      <section className="contact-card">
        <div>
          <h2>ข้อมูลติดต่อ</h2>
          <p>โทร: 081-234-5678</p>
          <p>อีเมล: support@mellowshop.com</p>
          <p>ที่อยู่: ชั้น 4 อาคารเรียนวิทยาการคอมพิวเตอร์</p>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <label>
            ชื่อของคุณ
            <input type="text" placeholder="เช่น สมชาย" required />
          </label>
          <label>
            อีเมล
            <input type="email" placeholder="example@mail.com" required />
          </label>
          <label>
            ข้อความ
            <textarea
              rows="5"
              placeholder="เขียนข้อความของคุณที่นี่"
              required
            />
          </label>
          <button type="submit" className="primary-btn">
            ส่งข้อความ
          </button>
        </form>
      </section>
    </main>
  );
}
