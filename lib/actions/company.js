'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadCompanies = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Yikun_collection = require('./..\\data\\Discs\\Yikun_collection.json');

var _Yikun_collection2 = _interopRequireDefault(_Yikun_collection);

var _WhamO_collection = require('./..\\data\\Discs\\WhamO_collection.json');

var _WhamO_collection2 = _interopRequireDefault(_WhamO_collection);

var _Westside_collection = require('./..\\data\\Discs\\Westside_collection.json');

var _Westside_collection2 = _interopRequireDefault(_Westside_collection);

var _Viking_collection = require('./..\\data\\Discs\\Viking_collection.json');

var _Viking_collection2 = _interopRequireDefault(_Viking_collection);

var _Vibram_collection = require('./..\\data\\Discs\\Vibram_collection.json');

var _Vibram_collection2 = _interopRequireDefault(_Vibram_collection);

var _UBDiscGolf_collection = require('./..\\data\\Discs\\UBDiscGolf_collection.json');

var _UBDiscGolf_collection2 = _interopRequireDefault(_UBDiscGolf_collection);

var _TOBUDiscs_collection = require('./..\\data\\Discs\\TOBUDiscs_collection.json');

var _TOBUDiscs_collection2 = _interopRequireDefault(_TOBUDiscs_collection);

var _Streamline_collection = require('./..\\data\\Discs\\Streamline_collection.json');

var _Streamline_collection2 = _interopRequireDefault(_Streamline_collection);

var _SnapDisc_collection = require('./..\\data\\Discs\\SnapDisc_collection.json');

var _SnapDisc_collection2 = _interopRequireDefault(_SnapDisc_collection);

var _Skyquest_collection = require('./..\\data\\Discs\\Skyquest_collection.json');

var _Skyquest_collection2 = _interopRequireDefault(_Skyquest_collection);

var _Skyiron_collection = require('./..\\data\\Discs\\Skyiron_collection.json');

var _Skyiron_collection2 = _interopRequireDefault(_Skyiron_collection);

var _SalientDiscs_collection = require('./..\\data\\Discs\\SalientDiscs_collection.json');

var _SalientDiscs_collection2 = _interopRequireDefault(_SalientDiscs_collection);

var _RPMDiscs_collection = require('./..\\data\\Discs\\RPMDiscs_collection.json');

var _RPMDiscs_collection2 = _interopRequireDefault(_RPMDiscs_collection);

var _RIP_collection = require('./..\\data\\Discs\\RIP_collection.json');

var _RIP_collection2 = _interopRequireDefault(_RIP_collection);

var _ReptilianDiscGolf_collection = require('./..\\data\\Discs\\ReptilianDiscGolf_collection.json');

var _ReptilianDiscGolf_collection2 = _interopRequireDefault(_ReptilianDiscGolf_collection);

var _QuestAT_collection = require('./..\\data\\Discs\\QuestAT_collection.json');

var _QuestAT_collection2 = _interopRequireDefault(_QuestAT_collection);

var _Prodiscus_collection = require('./..\\data\\Discs\\Prodiscus_collection.json');

var _Prodiscus_collection2 = _interopRequireDefault(_Prodiscus_collection);

var _ProdigyDiscs_collection = require('./..\\data\\Discs\\ProdigyDiscs_collection.json');

var _ProdigyDiscs_collection2 = _interopRequireDefault(_ProdigyDiscs_collection);

var _PlasticAddicts_collection = require('./..\\data\\Discs\\PlasticAddicts_collection.json');

var _PlasticAddicts_collection2 = _interopRequireDefault(_PlasticAddicts_collection);

var _Paradigm_collection = require('./..\\data\\Discs\\Paradigm_collection.json');

var _Paradigm_collection2 = _interopRequireDefault(_Paradigm_collection);

var _PacificCycle_collection = require('./..\\data\\Discs\\PacificCycle_collection.json');

var _PacificCycle_collection2 = _interopRequireDefault(_PacificCycle_collection);

var _OzoneDiscs_collection = require('./..\\data\\Discs\\OzoneDiscs_collection.json');

var _OzoneDiscs_collection2 = _interopRequireDefault(_OzoneDiscs_collection);

var _ObsidianDiscs_collection = require('./..\\data\\Discs\\ObsidianDiscs_collection.json');

var _ObsidianDiscs_collection2 = _interopRequireDefault(_ObsidianDiscs_collection);

var _NiteIze_collection = require('./..\\data\\Discs\\NiteIze_collection.json');

var _NiteIze_collection2 = _interopRequireDefault(_NiteIze_collection);

var _MVP_collection = require('./..\\data\\Discs\\MVP_collection.json');

var _MVP_collection2 = _interopRequireDefault(_MVP_collection);

var _MintDiscs_collection = require('./..\\data\\Discs\\MintDiscs_collection.json');

var _MintDiscs_collection2 = _interopRequireDefault(_MintDiscs_collection);

var _Millenium_collection = require('./..\\data\\Discs\\Millenium_collection.json');

var _Millenium_collection2 = _interopRequireDefault(_Millenium_collection);

var _Lightning_collection = require('./..\\data\\Discs\\Lightning_collection.json');

var _Lightning_collection2 = _interopRequireDefault(_Lightning_collection);

var _Legacy_collection = require('./..\\data\\Discs\\Legacy_collection.json');

var _Legacy_collection2 = _interopRequireDefault(_Legacy_collection);

var _Latitude64_collection = require('./..\\data\\Discs\\Latitude64_collection.json');

var _Latitude64_collection2 = _interopRequireDefault(_Latitude64_collection);

var _LasAves_collection = require('./..\\data\\Discs\\LasAves_collection.json');

var _LasAves_collection2 = _interopRequireDefault(_LasAves_collection);

var _Kastaplast_collection = require('./..\\data\\Discs\\Kastaplast_collection.json');

var _Kastaplast_collection2 = _interopRequireDefault(_Kastaplast_collection);

var _Innova_collection = require('./..\\data\\Discs\\Innova_collection.json');

var _Innova_collection2 = _interopRequireDefault(_Innova_collection);

var _HyzerBomb_collection = require('./..\\data\\Discs\\HyzerBomb_collection.json');

var _HyzerBomb_collection2 = _interopRequireDefault(_HyzerBomb_collection);

var _Hole19_collection = require('./..\\data\\Discs\\Hole19_collection.json');

var _Hole19_collection2 = _interopRequireDefault(_Hole19_collection);

var _Guru_collection = require('./..\\data\\Discs\\Guru_collection.json');

var _Guru_collection2 = _interopRequireDefault(_Guru_collection);

var _GGGT_collection = require('./..\\data\\Discs\\GGGT_collection.json');

var _GGGT_collection2 = _interopRequireDefault(_GGGT_collection);

var _Gateway_collection = require('./..\\data\\Discs\\Gateway_collection.json');

var _Gateway_collection2 = _interopRequireDefault(_Gateway_collection);

var _Galaxy_collection = require('./..\\data\\Discs\\Galaxy_collection.json');

var _Galaxy_collection2 = _interopRequireDefault(_Galaxy_collection);

var _FullTurnDiscs_collection = require('./..\\data\\Discs\\FullTurnDiscs_collection.json');

var _FullTurnDiscs_collection2 = _interopRequireDefault(_FullTurnDiscs_collection);

var _Franklin_collection = require('./..\\data\\Discs\\Franklin_collection.json');

var _Franklin_collection2 = _interopRequireDefault(_Franklin_collection);

var _FlyHighDiscs_collection = require('./..\\data\\Discs\\FlyHighDiscs_collection.json');

var _FlyHighDiscs_collection2 = _interopRequireDefault(_FlyHighDiscs_collection);

var _FlyByNite_collection = require('./..\\data\\Discs\\FlyByNite_collection.json');

var _FlyByNite_collection2 = _interopRequireDefault(_FlyByNite_collection);

var _Eurodisc_collection = require('./..\\data\\Discs\\Eurodisc_collection.json');

var _Eurodisc_collection2 = _interopRequireDefault(_Eurodisc_collection);

var _EssentialDiscs_collection = require('./..\\data\\Discs\\EssentialDiscs_collection.json');

var _EssentialDiscs_collection2 = _interopRequireDefault(_EssentialDiscs_collection);

var _EMSCOGroup_collection = require('./..\\data\\Discs\\EMSCOGroup_collection.json');

var _EMSCOGroup_collection2 = _interopRequireDefault(_EMSCOGroup_collection);

var _ElementDiscs_collection = require('./..\\data\\Discs\\ElementDiscs_collection.json');

var _ElementDiscs_collection2 = _interopRequireDefault(_ElementDiscs_collection);

var _DynamicDiscs_collection = require('./..\\data\\Discs\\DynamicDiscs_collection.json');

var _DynamicDiscs_collection2 = _interopRequireDefault(_DynamicDiscs_collection);

var _DKG_collection = require('./..\\data\\Discs\\DKG_collection.json');

var _DKG_collection2 = _interopRequireDefault(_DKG_collection);

var _Discwing_collection = require('./..\\data\\Discs\\Discwing_collection.json');

var _Discwing_collection2 = _interopRequireDefault(_Discwing_collection);

var _Discraft_collection = require('./..\\data\\Discs\\Discraft_collection.json');

var _Discraft_collection2 = _interopRequireDefault(_Discraft_collection);

var _Discmania_collection = require('./..\\data\\Discs\\Discmania_collection.json');

var _Discmania_collection2 = _interopRequireDefault(_Discmania_collection);

var _DiscKing_collection = require('./..\\data\\Discs\\DiscKing_collection.json');

var _DiscKing_collection2 = _interopRequireDefault(_DiscKing_collection);

var _DGA_collection = require('./..\\data\\Discs\\DGA_collection.json');

var _DGA_collection2 = _interopRequireDefault(_DGA_collection);

var _DestinyDiscs_collection = require('./..\\data\\Discs\\DestinyDiscs_collection.json');

var _DestinyDiscs_collection2 = _interopRequireDefault(_DestinyDiscs_collection);

var _DeityDisc_collection = require('./..\\data\\Discs\\DeityDisc_collection.json');

var _DeityDisc_collection2 = _interopRequireDefault(_DeityDisc_collection);

var _Daredevil_collection = require('./..\\data\\Discs\\Daredevil_collection.json');

var _Daredevil_collection2 = _interopRequireDefault(_Daredevil_collection);

var _Crosslap_collection = require('./..\\data\\Discs\\Crosslap_collection.json');

var _Crosslap_collection2 = _interopRequireDefault(_Crosslap_collection);

var _CHING_collection = require('./..\\data\\Discs\\CHING_collection.json');

var _CHING_collection2 = _interopRequireDefault(_CHING_collection);

var _BlackZombie_collection = require('./..\\data\\Discs\\BlackZombie_collection.json');

var _BlackZombie_collection2 = _interopRequireDefault(_BlackZombie_collection);

var _BlackJaxSports_collection = require('./..\\data\\Discs\\BlackJaxSports_collection.json');

var _BlackJaxSports_collection2 = _interopRequireDefault(_BlackJaxSports_collection);

var _Axiom_collection = require('./..\\data\\Discs\\Axiom_collection.json');

var _Axiom_collection2 = _interopRequireDefault(_Axiom_collection);

var _Arsenal_collection = require('./..\\data\\Discs\\Arsenal_collection.json');

var _Arsenal_collection2 = _interopRequireDefault(_Arsenal_collection);

var _AquaFlightDiscs_collection = require('./..\\data\\Discs\\AquaFlightDiscs_collection.json');

var _AquaFlightDiscs_collection2 = _interopRequireDefault(_AquaFlightDiscs_collection);

var _Aerobie_collection = require('./..\\data\\Discs\\Aerobie_collection.json');

var _Aerobie_collection2 = _interopRequireDefault(_Aerobie_collection);

var _AboveGroundLevelDisc_collection = require('./..\\data\\Discs\\AboveGroundLevelDisc_collection.json');

var _AboveGroundLevelDisc_collection2 = _interopRequireDefault(_AboveGroundLevelDisc_collection);

var _ABC_collection = require('./..\\data\\Discs\\ABC_collection.json');

var _ABC_collection2 = _interopRequireDefault(_ABC_collection);

var _disc_collection = require('./..\\data\\Discs\\1080disc_collection.json');

var _disc_collection2 = _interopRequireDefault(_disc_collection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var companies = {};

// import * as discActionTypes from '../actionTypes/company';

companies['YikunCollection'] = _Yikun_collection2.default;
companies['WhamOCollection'] = _WhamO_collection2.default;
companies['WestsideCollection'] = _Westside_collection2.default;
companies['VikingCollection'] = _Viking_collection2.default;
companies['VibramCollection'] = _Vibram_collection2.default;
companies['UBDiscGolfCollection'] = _UBDiscGolf_collection2.default;
companies['TOBUDiscsCollection'] = _TOBUDiscs_collection2.default;
companies['StreamlineCollection'] = _Streamline_collection2.default;
companies['SnapDiscCollection'] = _SnapDisc_collection2.default;
companies['SkyquestCollection'] = _Skyquest_collection2.default;
companies['SkyironCollection'] = _Skyiron_collection2.default;
companies['SalientDiscsCollection'] = _SalientDiscs_collection2.default;
companies['RPMDiscsCollection'] = _RPMDiscs_collection2.default;
companies['RIPCollection'] = _RIP_collection2.default;
companies['ReptilianDiscGolfCollection'] = _ReptilianDiscGolf_collection2.default;
companies['QuestATCollection'] = _QuestAT_collection2.default;
companies['ProdiscusCollection'] = _Prodiscus_collection2.default;
companies['ProdigyDiscsCollection'] = _ProdigyDiscs_collection2.default;
companies['PlasticAddictsCollection'] = _PlasticAddicts_collection2.default;
companies['ParadigmCollection'] = _Paradigm_collection2.default;
companies['PacificCycleCollection'] = _PacificCycle_collection2.default;
companies['OzoneDiscsCollection'] = _OzoneDiscs_collection2.default;
companies['ObsidianDiscsCollection'] = _ObsidianDiscs_collection2.default;
companies['NiteIzeCollection'] = _NiteIze_collection2.default;
companies['MVPCollection'] = _MVP_collection2.default;
companies['MintDiscsCollection'] = _MintDiscs_collection2.default;
companies['MilleniumCollection'] = _Millenium_collection2.default;
companies['LightningCollection'] = _Lightning_collection2.default;
companies['LegacyCollection'] = _Legacy_collection2.default;
companies['Latitude64Collection'] = _Latitude64_collection2.default;
companies['LasAvesCollection'] = _LasAves_collection2.default;
companies['KastaplastCollection'] = _Kastaplast_collection2.default;
companies['InnovaCollection'] = _Innova_collection2.default;
companies['HyzerBombCollection'] = _HyzerBomb_collection2.default;
companies['Hole19Collection'] = _Hole19_collection2.default;
companies['GuruCollection'] = _Guru_collection2.default;
companies['GGGTCollection'] = _GGGT_collection2.default;
companies['GatewayCollection'] = _Gateway_collection2.default;
companies['GalaxyCollection'] = _Galaxy_collection2.default;
companies['FullTurnDiscsCollection'] = _FullTurnDiscs_collection2.default;
companies['FranklinCollection'] = _Franklin_collection2.default;
companies['FlyHighDiscsCollection'] = _FlyHighDiscs_collection2.default;
companies['FlyByNiteCollection'] = _FlyByNite_collection2.default;
companies['EurodiscCollection'] = _Eurodisc_collection2.default;
companies['EssentialDiscsCollection'] = _EssentialDiscs_collection2.default;
companies['EMSCOGroupCollection'] = _EMSCOGroup_collection2.default;
companies['ElementDiscsCollection'] = _ElementDiscs_collection2.default;
companies['DynamicDiscsCollection'] = _DynamicDiscs_collection2.default;
companies['DKGCollection'] = _DKG_collection2.default;
companies['DiscwingCollection'] = _Discwing_collection2.default;
companies['DiscraftCollection'] = _Discraft_collection2.default;
companies['DiscmaniaCollection'] = _Discmania_collection2.default;
companies['DiscKingCollection'] = _DiscKing_collection2.default;
companies['DGACollection'] = _DGA_collection2.default;
companies['DestinyDiscsCollection'] = _DestinyDiscs_collection2.default;
companies['DeityDiscCollection'] = _DeityDisc_collection2.default;
companies['DaredevilCollection'] = _Daredevil_collection2.default;
companies['CrosslapCollection'] = _Crosslap_collection2.default;
companies['CHINGCollection'] = _CHING_collection2.default;
companies['BlackZombieCollection'] = _BlackZombie_collection2.default;
companies['BlackJaxSportsCollection'] = _BlackJaxSports_collection2.default;
companies['AxiomCollection'] = _Axiom_collection2.default;
companies['ArsenalCollection'] = _Arsenal_collection2.default;
companies['AquaFlightDiscsCollection'] = _AquaFlightDiscs_collection2.default;
companies['AerobieCollection'] = _Aerobie_collection2.default;
companies['AboveGroundLevelDiscCollection'] = _AboveGroundLevelDisc_collection2.default;
companies['ABCCollection'] = _ABC_collection2.default;
companies['1080discCollection'] = _disc_collection2.default;
var loadCompanies = exports.loadCompanies = function loadCompanies() {
  _lodash2.default.forEach(companies, function (file) {
    console.log(file);
    return file;
  });
};