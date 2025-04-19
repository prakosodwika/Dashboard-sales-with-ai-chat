from enum import Enum
class DealStatus(str, Enum):
  IN_PROGRESS = "In Progress"
  CLOSED_WON = "Closed Won"
  CLOSED_LOST = "Closed Lost"