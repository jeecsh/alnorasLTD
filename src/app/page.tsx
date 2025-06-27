import ModernAlnorasHero from '../../src/app/components/hero'
import AlnorasNavbaro from '../../src/app/components/navbar';
import   OurServices from '../../src/app/components/services';
import ModernImportExportSections from '../../src/app/components/importAndExport';
export default function Home() {
  return (
    <div >
   <ModernAlnorasHero/>
   <AlnorasNavbaro/>
   <OurServices/>
<ModernImportExportSections/>
    </div>
  );
}
