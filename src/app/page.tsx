import ModernAlnorasHero from '../../src/app/components/hero'
import AlnorasNavbaro from '../../src/app/components/navbar';
import   OurServices from '../../src/app/components/services';
import ModernImportExportSections from '../../src/app/components/importAndExport';
import ContactUs from '../../src/app/components/contact';
import ScrollSlideComponent from '../../src/app/components/slider';
import AlnorasFooter from '../../src/app/components/footer';
export default function Home() {
  return (
    <div >
    <main>
      <div id="home" >
        <ModernAlnorasHero />
      </div>
      <AlnorasNavbaro />
      <div id="services">
        <OurServices/>
      </div>
      <div id="import">
        <ModernImportExportSections/>
      </div>
      <div id="">
        <ScrollSlideComponent/>
      </div>
      <div id="contact">
        <ContactUs/>
      </div>
      <AlnorasFooter/>
      

    </main>
    </div>
  );
}
