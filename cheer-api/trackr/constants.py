TRACKR_PREFIX = "TRACKR_"
EVENT_KEY = lambda event: f"{TRACKR_PREFIX}{event}"
COUNT_FOR_EVENT_KEY = lambda event: f"count_{TRACKR_PREFIX}{event}"
MAX_FOR_EVENT_KEY = lambda event: f"max_{TRACKR_PREFIX}{event}"
