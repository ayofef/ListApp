import Flows from '../../assets/icons/MainNav/Flows';
import Tour from '../../assets/icons/MainNav/Tour';
import Users from '../../assets/icons/GettingStarted/Users';
import { UI_ROUTES } from '../../constants/routes';
import { SETTINGS_PERMISSIONS_IDS } from '../Settings/permissions';

const SECTIONS = [
  {
    title: 'Get started with automations',
    desc: 'Follow the steps below to get the most out of WhenThen.',
    steps: [
      {
        dataKey: 'basicAutomation',
        Icon: Flows,
        url: UI_ROUTES.automationsDirectory,
        title: 'Create a Payment Automation',
        desc:
          'WhenThen automations help you increase revenue, decrease PaymentOps costs and delight your customers. and colleagues',
      },
      // {
      //   dataKey: 'premiumAutomation',
      //   Icon: Flows,
      //   url: UI_ROUTES.automationsDirectory,
      //   title: 'Create a Premium Automation',
      //   desc: 'Build your own automation or enable a template.',
      // },
      {
        dataKey: 'inviteColleagues',
        Icon: Users,
        url: UI_ROUTES.userManagement,
        title: 'Invite colleagues',
        desc: 'Invite colleagues under different user permission levels',
        permission: SETTINGS_PERMISSIONS_IDS.userManagement,
      },
      {
        dataKey: 'takeTour',
        Icon: Tour,
        url: '#',
        title: 'Take a Tour',
        desc: 'Take a simple tour through all the features of WhenThen',
      },
    ],
  },
  // {
  //   title: 'Invite team',
  //   desc: "Don't have to do it alone, WhenThen works great with colleagues.",
  //   permission: SETTINGS_PERMISSIONS_IDS.userManagement,
  //   steps: [
  //     {
  //       dataKey: 'inviteColleagues',
  //       Icon: Users,
  //       url: UI_ROUTES.userManagement,
  //       title: 'Invite colleagues',
  //       desc: 'Invite colleagues under different user permission levels',
  //     },
  //     {
  //       dataKey: 'takeTour',
  //       Icon: Tour,
  //       url: UI_ROUTES.userManagement,
  //       title: 'Take a Tour',
  //       desc: 'Take a simple tour through all the features of WhenThen',
  //     },
  //   ],
  // },
];

export { SECTIONS };
