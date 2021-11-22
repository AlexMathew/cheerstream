from itertools import chain

from .constants import (
    CricketBilateralSeriesTeams,
    CricketEvents,
    EPLTeams,
    F1Teams,
    FootballEvents,
    ISLTeams,
    Sports,
)

BY_SPORT = {
    Sports.CRICKET.value: [
        "ESPNcricinfo",
        "cricbuzz",
        "cricketaakash",
        "bhogleharsha",
        "WasimJaffer14",
        "cricketwallah",
        "kaustats",
        "bhaleraosarang",
        "mufaddal_vohra",
        "ComeOnCricket",
        "SriniMaama16",
        "CricCrazyJohns",
        "IndianMourinho",
        "GlobalLeagues",
        "sreshthx",
    ],
    Sports.FOOTBALL.value: [],
    Sports.F1.value: [
        "F1",
        "SkySportsF1",
        "chrismedlandf1",
        "lukesmithf1",
        "wearetherace",
        "kunalashah",
        "f1niharika",
        "adamcooperf1",
        "LightsOutF1Blog",
        "HillF1",
        "MattyWTF1",
        "chainbear",
        "wtf1official",
        "PurePitWall",
        "F1Struggle",
    ],
}

BY_CRICKET_EVENT = {
    # CricketEvents.IPL.value: ["IPL"],
    CricketEvents.T20_WC.value: [
        # "ICC",
        # "T20WorldCup",
        # "ajarrodkimber",
        # "im_sandipan",
        # "cricvizanalyst",
        # "SriniMaama16",
        # "chand2579",
        # "beastieboy07",
        # "cricsubhayan",
        # "kaustats",
        # "CursedCricket__",
        # "vikramsathaye",
        # "srinathb",
        # "BoriaMajumdar",
        # "bhaleraosarang",
        # "WisdenCricket",
        # "WisdenIndia",
        # "mohanstatsman",
        # "deeputalks",
        # "UPStatsman",
        # "reemamalhotra8",
        # "OptaJeev",
        # "daniel86cricket",
        # "peterdellapenna",
        # "timwig",
        # "BdJcricket",
        # "NickFriend1",
        # "sreshthx",
        # "fwildecricket",
        # "PaulRadley",
        # "Cricketracker",
        # "CricCrazyJohns",
        # "ovshake42",
        # "kartcric",
        # "DGBeswick1",
        # "andrewnixon79",
        # "Thejuly23rdd",
        # "benjonescricket",
        # "srini_vk",
        # "IndianMourinho",
        # "mroller98",
    ],
    CricketEvents.NZ_TOUR_OF_INDIA.value: [],
}

BY_FOOTBALL_EVENT = {
    FootballEvents.ENGLISH_PREMIER_LEAGUE.value: [
        "premierleague",
        "OfficialFPL",
        "SkySportsPL",
        "SkySportsStatto",
        "OptaJoe",
        "FFScout",
        "TrollFootball",
        "footballltrolls",
        "footyhumour",
        "OptaJoke",
        "Squawka",
        "SquawkaNews",
        "StatmanDave",
        "EBL2017",
        "henrywinter",
        "CursedFootball",
        "DeludedBrendan",
        "LetsTalk_FPL",
        "Zonal_Marking",
        "melissareddy_",
        "MiguelDelaney",
        "GaryLineker",
        "BBCMOTD",
        "xGPhilosophy",
        "vaibhardwaj",
        "Tactical_Times",
        "PremLeaguePanel",
    ],
    FootballEvents.INDIAN_SUPER_LEAGUE.value: [
        "IndSuperLeague",
        "harithoyakkat",
    ],
}

BY_EVENT = {
    **BY_CRICKET_EVENT,
    **BY_FOOTBALL_EVENT,
}

BY_IPL_TEAM = {
    # IPLTeams.CSK.value: ["ChennaiIPL"],
    # IPLTeams.DC.value: ["DelhiCapitals"],
    # IPLTeams.KKR.value: ["KKRiders"],
    # IPLTeams.MI.value: ["mipaltan"],
    # IPLTeams.PBKS.value: ["PunjabKingsIPL"],
    # IPLTeams.RCB.value: ["RCBTweets"],
    # IPLTeams.RR.value: ["rajasthanroyals"],
    # IPLTeams.SRH.value: ["SunRisers"],
}

BY_T20_WC_TEAM = {
    # T20WCTeams.AFG.value: ["ACBofficials"],
    # T20WCTeams.AUS.value: ["cricketaus", "cricketcomau"],
    # T20WCTeams.BAN.value: ["BCBtigers"],
    # T20WCTeams.ENG.value: ["englandcricket"],
    # T20WCTeams.IND.value: ["BCCI", "indiancricnews"],
    # T20WCTeams.IRE.value: ["cricketireland"],
    # T20WCTeams.NAM.value: ["CricketNamibia1"],
    # T20WCTeams.NED.value: ["KNCBcricket"],
    # T20WCTeams.NZ.value: ["BLACKCAPS"],
    # T20WCTeams.OMA.value: ["theomancricket"],
    # T20WCTeams.PAK.value: ["TheRealPCB", "ArfaSays_", "SajSadiqCricket"],
    # T20WCTeams.PNG.value: ["Cricket_PNG"],
    # T20WCTeams.SA.value: ["OfficialCSA"],
    # T20WCTeams.SCO.value: ["CricketScotland"],
    # T20WCTeams.SL.value: ["OfficialSLC", "rexclementine"],
    # T20WCTeams.WI.value: ["windiescricket", "CaribCricket"],
}

BY_BILATERAL_SERIES_TEAMS = {
    CricketBilateralSeriesTeams.IND.value: ["BCCI", "indiancricnews"],
    CricketBilateralSeriesTeams.NZ.value: ["BLACKCAPS"],
}

BY_EPL_TEAM = {
    EPLTeams.ARS.value: [
        "Arsenal",
        "charles_watts",
        "FunnyGooner",
        "EduardoHagn",
        "yankeegunner",
        "gunnerblog",
        "arsenalmoh8",
    ],
    EPLTeams.AVL.value: [
        # "AVFCOfficial",
        "greggevans40",
        "7500toholte",
        "VillaAnalytics",
        "PreeceObserver",
        "mjmarr_star",
    ],
    EPLTeams.BRE.value: ["BrentfordFC", "jaydmharris", "beesotted"],
    EPLTeams.BHA.value: [
        "OfficialBHAFC",
        "andynaylorbhafc",
        "wearebrighton",
        "NorthStandChat",
        "SeagullsCentral",
    ],
    EPLTeams.BUR.value: ["BurnleyOfficial", "adjones_journo"],
    EPLTeams.CHE.value: [
        "ChelseaFC",
        "AlexGoldberg_",
        "SJohnsonSport",
        "NizaarKinsella",
        "CFCDaily",
        "Blue_Footy",
        "CarefreeYouth",
        "eli_helenek",
        "Sam_InkersoleTM",
        "siphillipssport",
        "AbsoluteChelsea",
    ],
    EPLTeams.CRY.value: ["CPFC", "mattwoosie", "alitheeagle1", "talkcpfc"],
    EPLTeams.EVE.value: ["Everton", "paddy_boyland", "mightybluesyt"],
    EPLTeams.LEE.value: ["LUFC", "philhay_", "joedonnohue", "LUFCDATA"],
    EPLTeams.LEI.value: ["LCFC", "robtannerlcfc", "TheSharpeEnd"],
    EPLTeams.LIV.value: [
        "LFC",
        "jamespearcelfc",
        "_lfcleanne",
        "empireofthekop",
        "thisisanfield",
        "JimBoardman",
        "IanDoyleSport",
    ],
    EPLTeams.MCI.value: [
        "ManCity",
        "pundit_jay",
        "StatCity",
        "City_Xtra",
        "DavidMooney",
        "jonnysmiffy",
    ],
    EPLTeams.MUN.value: [
        "ManUtd",
        "UnitedPeoplesTV",
        "utdreport",
        "sistoney67",
        "markgoldbridge",
        "UnitedStandMUFC",
        "samuelluckhurst",
        "AndyMitten",
        "lauriewhitwell",
        "StrettyNews",
        "maramperninety",
        "UTDTrey",
        "AlternativeMUFC",
        "vintageredss",
        "UtdDistrict",
        "utd_analytics",
        "SensibleUtd",
        "CharDuncker",
        "MonaShehata",
    ],
    EPLTeams.NEW.value: ["NUFC", "chrisdhwaugh", "craighope_dm", "lee_ryder"],
    EPLTeams.NOR.value: ["NorwichCityFC", "michaeljbailey", "ianclarke41"],
    EPLTeams.SOU.value: ["SouthamptonFC", "tomleachhl", "saintsfcviews"],
    EPLTeams.TOT.value: [
        "SpursOfficial",
        "dan_kp",
        "thespursweb",
        "jackpittbrooke",
        "cdeccleshare",
    ],
    EPLTeams.WAT.value: ["WatfordFC", "ant_watford", "observerryan"],
    EPLTeams.WHU.value: ["WestHam", "roshanesport", "_thomasjclark"],
    EPLTeams.WOL.value: ["Wolves", "TimSpiers", "LiamKeen_Star"],
}

BY_ISL_TEAM = {
    ISLTeams.ATK.value: ["atkmohunbaganfc"],
    ISLTeams.BEN.value: ["bengalurufc", "westblockblues"],
    ISLTeams.EBE.value: ["sc_eastbengal"],
    ISLTeams.GOA.value: ["FCGoaOfficial"],
    ISLTeams.JAM.value: ["JamshedpurFC"],
    ISLTeams.KER.value: ["KeralaBlasters"],
    ISLTeams.MUM.value: ["MumbaiCityFC"],
    ISLTeams.NEU.value: ["NEUtdFC"],
}

BY_F1_TEAM = {
    F1Teams.ALFA_ROMEO.value: ["alfaromeoracing"],
    F1Teams.ALPHATAURI.value: ["AlphaTauriF1"],
    F1Teams.ALPINE.value: ["AlpineF1Team"],
    F1Teams.ASTON_MARTIN.value: ["AstonMartinF1"],
    F1Teams.FERRARI.value: ["ScuderiaFerrari"],
    F1Teams.HAAS.value: ["HaasF1Team"],
    F1Teams.MCLAREN.value: ["McLarenF1"],
    F1Teams.MERCEDES.value: ["MercedesAMGF1"],
    F1Teams.RED_BULL.value: ["redbullracing"],
    F1Teams.WILLIAMS.value: ["WilliamsRacing"],
}

BY_TEAM = {
    **BY_IPL_TEAM,
    **BY_T20_WC_TEAM,
    **BY_BILATERAL_SERIES_TEAMS,
    **BY_EPL_TEAM,
    **BY_ISL_TEAM,
    **BY_F1_TEAM,
}


def create_reverse_mapping(mapping):
    reverse_mapping = {}
    for group, accounts in mapping.items():
        reverse_mapping.update({account: group for account in accounts})

    return reverse_mapping


ACCOUNT_TO_GROUP_MAPPING = {
    **create_reverse_mapping(BY_SPORT),
    **create_reverse_mapping(BY_EVENT),
    **create_reverse_mapping(BY_TEAM),
}


def get_all_accounts(mapping):
    return list(chain(*[accounts for accounts in mapping.values()]))


ALL_ACCOUNTS = [
    *get_all_accounts(BY_SPORT),
    *get_all_accounts(BY_EVENT),
    *get_all_accounts(BY_TEAM),
]
