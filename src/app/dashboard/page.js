'use client'

import Navbar from "@/components/Navbar";
import DashboardTimeline from "@/components/DashboardTimeline";
// import Notificaton from '../../general/Notification';
// import { selectCurrentFlashMessage } from '../../../features/notifications/notificationsSlice';

function Dahboard() {
  // const flash = useSelector(selectCurrentFlashMessage);

  // const maybeRenderFlash = () => {
  //   if (flash.message) {
  //     return <Notificaton title={flash.title} message={flash.message} icon={flash.icon} />;
  //   }
  //   return null;
  // };
  const content = (
    <div>
      {/* { maybeRenderFlash() } */}
      <Navbar />
      <DashboardTimeline />
    </div>
  );

  return content;
}
export default Dahboard;
