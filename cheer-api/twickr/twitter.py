import re
from typing import Dict, Optional

from .constants import (
    CricketEvents,
    EPLTeamsList,
    F1Teams,
    FootballEvents,
    ISLTeamsList,
    Sports,
)


class BaseSportTwitter:
    def __init__(self, sport: str, event: Optional[str] = None, **kwargs):
        self.sport = sport
        self.event = event

    @property
    def TEAMS_REGEX(self):
        raise NotImplementedError

    def get_teams_from_match(self, match: str) -> Dict[str, str]:
        teams = re.match(self.TEAMS_REGEX, match)
        return teams.groupdict() if teams else {}


class TwitterFactory:
    def __init__(self) -> None:
        self._builders: Dict[str, BaseSportTwitter] = {}

    def register_builder(self, key: str, builder: BaseSportTwitter):
        self._builders[key] = builder

    def create(self, key: str, **kwargs) -> BaseSportTwitter:
        builder = self._builders.get(key)
        if not builder:
            raise ValueError(key)

        return builder(key, **kwargs)


class TwitterSportClass(TwitterFactory):
    def get(self, sport: str, **kwargs) -> BaseSportTwitter:
        return self.create(sport, **kwargs)


class CricketTwitter(BaseSportTwitter):
    TEAMS_REGEX = r"(?P<team1>[a-zA-Z-]+)-vs-(?P<team2>[a-zA-Z-]+)-"
    DEFAULT_EVENT = CricketEvents.ASIA_CUP.value

    def __init__(self, sport: str, event: Optional[str] = None, **kwargs):
        super().__init__(sport, **kwargs)
        self.event = event or self.DEFAULT_EVENT


class FootballTwitter(BaseSportTwitter):
    TEAMS_REGEX = r"(?P<team1>[a-zA-Z-]+)-vs-(?P<team2>[a-zA-Z-]+)"

    def __init__(self, sport: str, match: Optional[str] = None, **kwargs):
        super().__init__(sport, **kwargs)
        teams = self.get_teams_from_match(match)
        if teams.get("team1") in EPLTeamsList or teams.get("team2") in EPLTeamsList:
            self.event = FootballEvents.ENGLISH_PREMIER_LEAGUE.value
        elif teams.get("team1") in ISLTeamsList or teams.get("team2") in ISLTeamsList:
            self.event = FootballEvents.INDIAN_SUPER_LEAGUE.value


class F1Twitter(BaseSportTwitter):
    def get_teams_from_match(self, match: str) -> Dict[str, str]:
        return {team: team.value for team in list(F1Teams)}


def create_cricket(sport: str, event: Optional[str] = None, **kwargs) -> CricketTwitter:
    return CricketTwitter(sport, event=event, **kwargs)


def create_football(sport: str, **kwargs) -> FootballTwitter:
    return FootballTwitter(sport, **kwargs)


def create_f1(sport: str, **kwargs) -> F1Twitter:
    return F1Twitter(sport, **kwargs)


services = TwitterSportClass()
services.register_builder(Sports.CRICKET.value, create_cricket)
services.register_builder(Sports.FOOTBALL.value, create_football)
services.register_builder(Sports.F1.value, create_f1)
