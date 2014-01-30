class Action(object):

    def __init__(self, player, objectId):
        self.player = player
        self.objectId = objectId
    
    def priority(self):
        """ Override to change priority """
        return 0


class Object(object):
    
    def perform(self, action):
        pass

    def initiative(self):
        # TODO: override in subclass
        return 0

class Game(object):
    
    def get_object(self, id):
        # TODO: override in subclass
        return None
    
def full_priority(game, action):
    return action.priority() + game.get_object(action.objectId).priority


class Handler(object):
    
    def __init__(self, game):
        self._actions = []
        self._game = game
    def perform(self, actions):
        self._actions = self._actions + actions
        all_moved = True
        for player in self._game.players():
            if not player in [action.player for action in self._actions]:
                all_moved = False
        # ensure actions are performed in correct order
        self._actions = sort(self._actions, key=lambda action: full_priority(self._game, action))
        if all_moved:
            for actions in self._actions:
                obj = self._game.get_object(action.objectId)
                obj.perform(action)

