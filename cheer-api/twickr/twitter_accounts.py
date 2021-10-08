from itertools import chain

from .constants import EPLTeams, Events, IPLTeams, Sports

BY_SPORT = {
    Sports.CRICKET.value: ["ESPNcricinfo", "cricbuzz", "cricketaakash", "bhogleharsha"],
    Sports.FOOTBALL.value: [
        "premierleague",
        "OfficialFPL",
        "SkySportsPL",
        "SkySportsStatto",
        "OptaJoe",
        "FFScout",
    ],
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
    EPLTeams.ARS.value: ["Arsenal"],
    EPLTeams.AVL.value: ["AVFCOfficial"],
    EPLTeams.BRE.value: ["BrentfordFC"],
    EPLTeams.BHA.value: ["OfficialBHAFC"],
    EPLTeams.BUR.value: ["BurnleyOfficial"],
    EPLTeams.CHE.value: ["ChelseaFC", "AlexGoldberg_"],
    EPLTeams.CRY.value: ["CPFC"],
    EPLTeams.EVE.value: ["Everton"],
    EPLTeams.LEE.value: ["LUFC"],
    EPLTeams.LEI.value: ["LCFC"],
    EPLTeams.LIV.value: ["LFC"],
    EPLTeams.MCI.value: ["ManCity"],
    EPLTeams.MUN.value: ["ManUtd", "UnitedPeoplesTV", "utdreport", "sistoney67"],
    EPLTeams.NEW.value: ["NUFC"],
    EPLTeams.NOR.value: ["NorwichCityFC"],
    EPLTeams.SOU.value: ["SouthamptonFC"],
    EPLTeams.TOT.value: ["SpursOfficial"],
    EPLTeams.WAT.value: ["WatfordFC"],
    EPLTeams.WHU.value: ["WestHam"],
    EPLTeams.WOL.value: ["Wolves"],
}

BY_TEAM = {**BY_IPL_TEAM, **BY_EPL_TEAM}


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
