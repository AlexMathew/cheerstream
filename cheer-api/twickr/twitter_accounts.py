from itertools import chain

from .constants import EPLTeams, Events, F1Teams, IPLTeams, Sports, T20WCTeams

BY_SPORT = {
    Sports.CRICKET.value: [
        "ESPNcricinfo",
        "cricbuzz",
        "StarSportsIndia",
        "cricketaakash",
        "bhogleharsha",
        "WasimJaffer14",
        "cricketwallah",
        "toisports",
        "ajarrodkimber",
        "im_sandipan",
        "cricvizanalyst",
    ],
    Sports.FOOTBALL.value: [
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
    ],
    Sports.F1.value: [
        "F1",
        "SkySportsF1",
        "chrismedlandf1",
        "lukesmithf1",
        "wearetherace",
        "kunalashah",
        "f1niharika",
        "adamcooperf1",
    ],
}

BY_EVENT = {
    # Events.IPL.value: ["IPL"],
    Events.T20_WC.value: [
        "ICC",
        "T20WorldCup",
        "daniel86cricket",
        "peterdellapenna",
        "timwig",
        "BdJcricket",
        "NickFriend1",
        "sreshthx",
    ],
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
    T20WCTeams.AFG.value: ["ACBofficials"],
    T20WCTeams.AUS.value: ["cricketaus", "cricketcomau"],
    T20WCTeams.BAN.value: ["BCBtigers"],
    T20WCTeams.ENG.value: ["englandcricket"],
    T20WCTeams.IND.value: ["BCCI", "indiancricnews"],
    T20WCTeams.IRE.value: ["cricketireland"],
    T20WCTeams.NAM.value: ["CricketNamibia1"],
    T20WCTeams.NED.value: ["KNCBcricket"],
    T20WCTeams.NZ.value: ["BLACKCAPS"],
    T20WCTeams.OMA.value: ["theomancricket"],
    T20WCTeams.PAK.value: ["TheRealPCB"],
    T20WCTeams.PNG.value: ["Cricket_PNG"],
    T20WCTeams.SA.value: ["OfficialCSA"],
    T20WCTeams.SCO.value: ["CricketScotland"],
    T20WCTeams.SL.value: ["OfficialSLC"],
    T20WCTeams.WI.value: ["windiescricket"],
}

BY_EPL_TEAM = {
    EPLTeams.ARS.value: [
        "Arsenal",
        "charles_watts",
        "FunnyGooner",
        "EduardoHagn",
        "yankeegunner",
        "gunnerblog",
    ],
    EPLTeams.AVL.value: ["AVFCOfficial", "greggevans40"],
    EPLTeams.BRE.value: ["BrentfordFC", "jaydmharris"],
    EPLTeams.BHA.value: ["OfficialBHAFC", "andynaylorbhafc"],
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
    ],
    EPLTeams.CRY.value: ["CPFC", "mattwoosie"],
    EPLTeams.EVE.value: ["Everton", "paddy_boyland"],
    EPLTeams.LEE.value: ["LUFC", "philhay_"],
    EPLTeams.LEI.value: ["LCFC", "robtannerlcfc", "TheSharpeEnd"],
    EPLTeams.LIV.value: [
        "LFC",
        "jamespearcelfc",
        "_lfcleanne",
        "empireofthekop",
        "thisisanfield",
        "JimBoardman",
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
    ],
    EPLTeams.NEW.value: ["NUFC", "chrisdhwaugh"],
    EPLTeams.NOR.value: ["NorwichCityFC", "michaeljbailey"],
    EPLTeams.SOU.value: ["SouthamptonFC", "tomleachhl"],
    EPLTeams.TOT.value: [
        "SpursOfficial",
        "dan_kp",
        "thespursweb",
        "jackpittbrooke",
        "cdeccleshare",
    ],
    EPLTeams.WAT.value: ["WatfordFC", "ant_watford"],
    EPLTeams.WHU.value: ["WestHam", "roshanesport"],
    EPLTeams.WOL.value: ["Wolves", "TimSpiers"],
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

BY_TEAM = {**BY_IPL_TEAM, **BY_T20_WC_TEAM, **BY_EPL_TEAM, **BY_F1_TEAM}


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
