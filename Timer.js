(function(module)
{
	'use strict';
	
	const EventEmitter = require('events');
	
	class Timer extends EventEmitter {
		constructor(delay, repeatCount)
		{
			super();
			this._running = false;
			this._delay = delay;
			this._repeatCount = typeof repeatCount === 'number' ? repeatCount : 0;
			this._currentCount = 0;
			this._intervalId = null;
		}
		
		get currentCount()
		{
			return this._currentCount;
		}
		
		get delay()
		{
			return this._delay;
		}
		
		set delay(value)
		{
			this._delay = value;
			
			if (this.running)
			{
				this._restart();
			}
		}
		
		get repeatCount()
		{
			return this._repeatCount;
		}
		
		set repeatCount(value)
		{
			this._repeatCount = value;
		}
		
		get running()
		{
			return this._running;
		}
		
		_repeat(_this, _emit)
		{
			if (_this.currentCount < _this.repeatCount)
			{
				_this._currentCount++;
				_emit.call(_this, 'timer');
			}
			
			if (_this.currentCount >= _this.repeatCount)
			{
				_this.stop();
			}
		}
		
		reset()
		{
			if (this.running)
			{
				this.stop();
			}
			
			this._currentCount = 0;
		}
		
		_restart()
		{
			this._running = false;
			clearInterval(this._intervalId);
			this.start();
		}
		
		start()
		{
			if (!this.running)
			{
				this._running = true;
				this._intervalId = setInterval(this._repeat, this.delay, this, super.emit);
			}
		}
		
		stop()
		{
			this._running = false;
			clearInterval(this._intervalId);
			this._intervalId = null;
			
			super.emit('timerComplete');
		}
	}
	
	module.exports = Timer;
})(module);
