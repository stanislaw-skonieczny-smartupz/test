function GameAction(playerId, objectId) {
    this.playerId = playerId;
    this.objectId = objectId;

    this.getPriority = function() {
        throw 'Override in subclass!';
    };
    this.perform = function(game) {
        throw 'Override in subclass!';
    };
};


function GameObject() {
    this.perform = function(action) {
        throw 'Override in subclass!';
    };
    this.getInitiative = function() {
        throw 'Override in subclass!';
    };
};


function SimplePriorityCalculator(game) {
    this.calculate = function(action) {
        return action.priority + game.getObject(action.objectId).getInitiative();
    };
};


function Game(_priorityCalculator) {
    var priorityCalculator = priorityCalculator || new SimplePriorityCalculator(this);
    
    this.getObject = function(objectId) {
        throw 'Override in subclass!';        
    };
    this.getPlayers = function() {
        throw 'Override in subclass!';        
    };
    this.priorityComparator = function(action1, action2) {
        var calculator = this.priorityCalculator;
        if (calculator.calculate(action1) > calculator.calculate(action2)) return 1;
        if (calculator.calculate(action1) < calculator.calculate(action2)) return -1;
        return 0;
    };
};


function GameFactory() {
    this.getGame() = function() {
        throw 'Override in subclass!';  
    };
};


function GameActionQueue(gameFactory) {
    var actions = [];
    
    this.perform = function(playerActions) {
        actions = acions.concat(playerActions);
        var allPlayersMoved = true;
        for (var player in players) {
            var found = false;
            for (var action in actions) {
                if (action.playerId === player.id) {
                    found = true;
                }
            }
            if (!found) {
                allMoved = false;
            }
        };
        actions.sort(function(a, b) { return cmp(game.priorityComparator(a, b)); });
        if (allPlayersMoved) {
            this.commit();
        };
    };
    this.commit = function() {
        var game = gameFactory.getGame();
        for (var action in actions) {
            action.perform();
        }
    };
};

