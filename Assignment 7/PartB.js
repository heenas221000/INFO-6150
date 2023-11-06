let intervalId;
        let startTime = 0;
        let isRunning = false;
        const stopwatch = document.getElementById("stopwatch");
        const datePicker = document.getElementById("date-picker");

        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function updateTime() {
            while (isRunning) {
                const currentTime = Date.now();
                const elapsedTime = currentTime - startTime;
                const time = new Date(elapsedTime);
                const hours = time.getUTCHours().toString().padStart(2, '0');
                const minutes = time.getUTCMinutes().toString().padStart(2, '0');
                const seconds = time.getUTCSeconds().toString().padStart(2, '0');
                stopwatch.textContent = `${hours}:${minutes}:${seconds}`;
                await delay(1000);
            }
        }

        async function startTimer() {
            if (!isRunning) {
                // Get the selected date and time from the date picker
                const selectedDateTime = new Date(datePicker.value).getTime();
                startTime = selectedDateTime || Date.now();
                isRunning = true;
                intervalId = setInterval(updateTime, 1000);
            }
        }

        function stopTimer() {
            isRunning = false;
            clearInterval(intervalId);
        }

        function resetTimer() {
            stopTimer();
            startTime = 0;
            stopwatch.textContent = '00:00:00';
        }

        document.getElementById("startButton").addEventListener("click", startTimer);
        document.getElementById("stopButton").addEventListener("click", stopTimer);
        document.getElementById("resetButton").addEventListener("click", resetTimer);

        // Get the current date
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;

        // Set the current date as the default value
        datePicker.value = formattedDate;