/* eslint-disable global-require */
/* eslint-disable no-undef */
import DashboardLabels from '../labels/screensLabel';

items = [
  {
    label: DashboardLabels.labels.START,
    style: { backgroundColor: '#8208D4' },
    image: require('../../assets/images/start.png'),
  },
  { label: DashboardLabels.labels.ACHIEVEMENTS,
    style: { backgroundColor: '#b30000' },
    image: require('../../assets/images/trophie.png'),
  },
  { label: DashboardLabels.labels.CHALLENGE,
    style: { backgroundColor: '#03A86F' },
    image: require('../../assets/images/challenge.png'),
  },
  { label: DashboardLabels.labels.TOPSCORE,
    style: { backgroundColor: '#3D91F2' },
    image: require('../../assets/images/topscore.png'),
  },
  { label: DashboardLabels.labels.SETTINGS,
    style: { backgroundColor: '#ff8080' },
    image: require('../../assets/images/settings.png'),
  },
  { label: DashboardLabels.labels.PROFILE,
    style: { backgroundColor: '#F77043' },
    image: require('../../assets/images/profil.png'),
  },
  { label: DashboardLabels.labels.FRIENDS,
    style: { backgroundColor: '#34cbcb' },
    image: require('../../assets/images/friends.png'),
  },
  { label: DashboardLabels.labels.DISCONNECT,
    style: { backgroundColor: '#ff0080' },
    image: require('../../assets/images/disconnect.png'),
  }
];

export default items;
