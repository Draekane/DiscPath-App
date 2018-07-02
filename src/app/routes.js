import BagSetup from '../containers/bagSetup/bagSetup';
import SimilarDisc from '../containers/similarDisc/similarDisc';

export const routes = [
  { path: '/', component: BagSetup },
  { path: '/bagSetup', component: BagSetup },
  { path: '/similarDisc', component: SimilarDisc },
];

export const sampleRoutes = [
  { path: '/', component: BagSetup },
  { path: '/bagSetup', component: BagSetup },
  { path: '/similarDisc', component: SimilarDisc },
];
