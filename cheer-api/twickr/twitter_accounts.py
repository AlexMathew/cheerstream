from itertools import chain

from .constants import EPLTeams, Events, F1Teams, IPLTeams, Sports

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
        "BoringMilner",
        "Squawka",
        "SquawkaNews",
        "StatmanDave",
        "EBL2017",
        "henrywinter",
    ],
    Sports.F1.value: ["F1", "SkySportsF1"],
}

BY_EVENT = {
    Events.IPL.value: ["IPL"],
}

BY_IPL_TEAM = {
    IPLTeams.CSK.value: ["ChennaiIPL"],
    IPLTeams.DC.value: ["DelhiCapitals"],
    IPLTeams.KKR.value: ["KKRiders"],
    IPLTeams.MI.value: ["mipaltan"],
    IPLTeams.PBKS.value: ["PunjabKingsIPL"],
    IPLTeams.RCB.value: ["RCBTweets"],
    IPLTeams.RR.value: ["rajasthanroyals"],
    IPLTeams.SRH.value: ["SunRisers"],
}

BY_EPL_TEAM = {
    EPLTeams.ARS.value: ["Arsenal", "charles_watts", "FunnyGooner", "EduardoHagn"],
    EPLTeams.AVL.value: ["AVFCOfficial"],
    EPLTeams.BRE.value: ["BrentfordFC"],
    EPLTeams.BHA.value: ["OfficialBHAFC"],
    EPLTeams.BUR.value: ["BurnleyOfficial"],
    EPLTeams.CHE.value: [
        "ChelseaFC",
        "AlexGoldberg_",
        "SJohnsonSport",
        "NizaarKinsella",
        "CFCDaily",
        "Blue_Footy",
        "CarefreeYouth",
        "eli_helenek",
    ],
    EPLTeams.CRY.value: ["CPFC"],
    EPLTeams.EVE.value: ["Everton"],
    EPLTeams.LEE.value: ["LUFC"],
    EPLTeams.LEI.value: ["LCFC"],
    EPLTeams.LIV.value: ["LFC", "jamespearcelfc", "_lfcleanne"],
    EPLTeams.MCI.value: ["ManCity"],
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
    ],
    EPLTeams.NEW.value: ["NUFC"],
    EPLTeams.NOR.value: ["NorwichCityFC"],
    EPLTeams.SOU.value: ["SouthamptonFC"],
    EPLTeams.TOT.value: ["SpursOfficial", "dan_kp"],
    EPLTeams.WAT.value: ["WatfordFC"],
    EPLTeams.WHU.value: ["WestHam"],
    EPLTeams.WOL.value: ["Wolves"],
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

BY_TEAM = {**BY_IPL_TEAM, **BY_EPL_TEAM, **BY_F1_TEAM}


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
