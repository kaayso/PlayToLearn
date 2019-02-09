/* eslint-disable global-require */
/* eslint-disable no-undef */
import DashboardLabels from './Labels';

items = [
  {
    label: DashboardLabels.labels.START,
    style: { backgroundColor: '#BFBF02' },
    image: require('../../assets/images/start.png'),
  },
  { label: DashboardLabels.labels.ACHIEVEMENTS,
    style: { backgroundColor: '#129FC9' },
    image: require('../../assets/images/trophie.png'),
  },
  { label: DashboardLabels.labels.CHALLENGE,
    style: { backgroundColor: '#03A86F' },
    image: require('../../assets/images/challenge.png'),
  },
  { label: DashboardLabels.labels.TOPSCORE,
    style: { backgroundColor: '#385AF2' },
    image: require('../../assets/images/topscore.png'),
  },
  { label: DashboardLabels.labels.SETTINGS,
    style: { backgroundColor: '#8208D4' },
    image: require('../../assets/images/settings.png'),
  },
  { label: DashboardLabels.labels.MYPROFILE,
    style: { backgroundColor: '#F77043' },
    image: require('../../assets/images/profil.png'),
  },
  { label: DashboardLabels.labels.MYFRIENDS,
    style: { backgroundColor: '#3D91F2' },
    image: require('../../assets/images/friends.png'),
  },
  { label: DashboardLabels.labels.DISCONNECT,
    style: { backgroundColor: '#BF04B9' },
    image: require('../../assets/images/disconnect.png'),
  }
];

export default items;
