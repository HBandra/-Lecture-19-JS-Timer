		const container = document.querySelector('.container');
		const btnStart = document.getElementById('btnStart');
		const btnStop = document.getElementById('btnStop');
		const timeCounter1 = document.getElementById('time1');
		const timeCounter2 = document.getElementById('time2');
		const progress = document.getElementById('time2');
		const bar1 = document.getElementById("myBar1");
		const bar2 = document.getElementById("myBar2");

		let isTimer = false;

		class Timer {
			constructor(time, counter, step, progress, autoRun = false) {
				this.interval = 0;
				this.counter = counter;
				this.time = time * 1000;
				this.autoRun = autoRun;
				this.progress = progress;
				this.start = function () {
					if (this.time) {
						let self = this;
						this.interval = setInterval(function () {
							self.time -= step;
							self.counter.innerHTML = timeFormat(self.time / 1000);

							self.progress.style.width = calcWidth(time, self.time);
							if (self.time === 0) {
								self.time = time * 1000;
								self.progress.style.width = calcWidth(time, time);
							}
						}, step);
					}
				};
				this.stop = function () {
					clearInterval(this.interval);
				};
			}
		}

		function calcWidth(time, left) {
			return (left / time * 100 / 1000).toFixed() + '%';
		}

		function timeFormat(t) {
			let seconds = t % 60;
			let minutes = Math.floor(t / 60);
			return format(minutes) + ':' + format(seconds);
		}

		function format(n) {
			return n > 9 ? n : '0' + n;
		}

		function toggleTimer(e, timer) {
			if (!timer.autoRun) {
				timer.start();
				e.target.value = 'Stop';
			} else {
				timer.stop();
				e.target.value = 'Start';
			}
			timer.autoRun = !timer.autoRun;
		}

		function createTimer(time, btn, step, bar, auto) {
			const timer = new Timer(time, btn, step, bar, auto);
			timer.autoRun && timer.start();
			return timer;
		}

		let timer1 = createTimer(15, timeCounter1, 1000, bar1);
		let timer2 = createTimer(200, timeCounter2, 2000, bar2, true);