import ModernAlnorasHero from '../../src/app/components/hero'
import AlnorasNavbaro from '../../src/app/components/navbar';
import   OurServices from '../../src/app/components/services';
import ModernImportExportSections from '../../src/app/components/importAndExport';
// import ContactUs from '../../src/app/components/contact';
import ScrollSlideComponent from '../../src/app/components/slider';
import AlnorasFooter from '../../src/app/components/footer';
export default function Home() {
  return (
    <div >
   <ModernAlnorasHero/>
   <AlnorasNavbaro/>
   <OurServices/>
<ModernImportExportSections/>
<ScrollSlideComponent/>
{/* <ContactUs/> */}
<AlnorasFooter/>
    </div>
  );
}
