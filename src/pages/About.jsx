export default function About() {
  return (
    <main>
      <section className="about-hero">
        <div className="about-hero-copy">
          <p className="eyebrow">เกี่ยวกับร้าน</p>
          <h1>
            ร้านค้าออนไลน์ตัวอย่างที่ออกแบบมาให้ดูน่าเชื่อถือและใช้งานง่าย
          </h1>
          <p>
            หน้าเว็บนี้สร้างขึ้นเพื่อแสดงแนวคิด E-commerce แบบครบวงจร
            โดยเน้นความสวยงาม ความเรียบง่าย
            และโครงสร้างที่เข้าใจง่ายสำหรับการนำเสนอผลงาน
          </p>
          <div className="about-actions">
            <a href="?page=product" className="primary-btn">
              ดูสินค้า
            </a>
            <a href="?page=contact" className="secondary-btn">
              ติดต่อเรา
            </a>
          </div>
        </div>
        <div className="about-hero-card">
          <p className="about-badge">จุดมุ่งหมาย</p>
          <ul>
            <li>ออกแบบให้ดูเป็นร้านค้าออนไลน์จริง</li>
            <li>มีฟีเจอร์ค้นหาและตะกร้าสินค้า</li>
            <li>พร้อมขยายเป็นระบบจริงในอนาคต</li>
          </ul>
        </div>
      </section>
      <section className="about-metrics">
        <article>
          <strong>6 หน้า</strong>
          <p>ประกอบด้วยหน้าหลัก สินค้า เกี่ยวกับ ติดต่อ และชำระเงิน</p>
        </article>
        <article>
          <strong>100%</strong>
          <p>รองรับการดูบนจอเล็กและจอใหญ่</p>
        </article>
        <article>
          <strong>0</strong>
          <p>ข้อความซ้ำซ้อนที่ไม่จำเป็นในหน้าแสดงข้อมูล</p>
        </article>
      </section>
      <section className="about-grid">
        <article className="about-card accent-card">
          <h3>ทำไมเลือกเว็บนี้</h3>
          <p>
            เพราะมันให้ความรู้สึกของร้านค้าออนไลน์ที่น่าเชื่อถือ
            พร้อมลุคที่ดูทันสมัยและสอดคล้องกับงานนำเสนอ
          </p>
        </article>
        <article className="about-card">
          <h3>สิ่งที่มีในเว็บไซต์</h3>
          <ul className="about-list">
            <li>หน้าร้านที่ดูสะอาดและเรียบง่าย</li>
            <li>ตัวกรองหมวดหมู่และการค้นหา</li>
            <li>ตะกร้าสินค้าทำงานบนเบราว์เซอร์</li>
          </ul>
        </article>
        <article className="about-card">
          <h3>เป้าหมายของโปรเจกต์</h3>
          <p>
            เพื่อแสดงให้เห็นว่าเราสามารถสร้างเว็บขายของได้จากพื้นฐาน HTML, CSS
            และ JavaScript และต่อยอดได้ต่อไป
          </p>
        </article>
      </section>
      <section className="about-guide" aria-labelledby="about-guide-title">
        <div className="about-guide-heading">
          <p className="eyebrow">เริ่มต้นใช้งาน</p>
          <h2 id="about-guide-title">แนะนำเส้นทางสำหรับการเลือกซื้อ</h2>
          <p>
            ลองสำรวจร้านตามขั้นตอนสั้น ๆ เพื่อค้นหาสินค้าที่ตรงใจได้ง่ายขึ้น
          </p>
        </div>
        <div className="about-guide-steps">
          <article className="about-guide-step">
            <span>01</span>
            <h3>สำรวจสินค้า</h3>
            <p>เริ่มจากหน้าหลักเพื่อดูสินค้าเด่นและรายการทั้งหมดของร้าน</p>
          </article>
          <article className="about-guide-step">
            <span>02</span>
            <h3>ค้นหาสิ่งที่ชอบ</h3>
            <p>ใช้ช่องค้นหาหรือตัวกรองหมวดหมู่เพื่อดูตัวเลือกที่เหมาะกับคุณ</p>
          </article>
          <article className="about-guide-step">
            <span>03</span>
            <h3>ตรวจสอบก่อนสั่งซื้อ</h3>
            <p>เพิ่มสินค้าลงตะกร้า ตรวจสอบรายการ แล้วไปยังหน้าชำระเงิน</p>
          </article>
        </div>
        <a href="?page=product" className="primary-btn about-guide-action">
          เริ่มเลือกซื้อสินค้า
        </a>
      </section>
    </main>
  );
}
