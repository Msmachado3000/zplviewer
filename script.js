class DigitalClock {
    constructor() {
        this.timezones = [];
        this.clocksContainer = document.getElementById('clocks-container');
        this.timezoneSelect = document.getElementById('timezone-select');
        this.addBtn = document.getElementById('add-btn');
        this.clearAllBtn = document.getElementById('clear-all-btn');
        
        this.init();
    }
    
    init() {
        this.addBtn.addEventListener('click', () => this.addTimezone());
        this.clearAllBtn.addEventListener('click', () => this.clearAll());
        this.timezoneSelect.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTimezone();
        });
        
        // Add default timezones
        this.addTimezone('America/New_York');
        this.addTimezone('Europe/London');
        this.addTimezone('Asia/Tokyo');
        
        // Update clocks every second
        setInterval(() => this.updateAllClocks(), 1000);
    }
    
    addTimezone(timezone = null) {
        timezone = timezone || this.timezoneSelect.value;
        
        if (!timezone) {
            alert('Please select a timezone');
            return;
        }
        
        if (this.timezones.includes(timezone)) {
            alert('This timezone is already added');
            return;
        }
        
        this.timezones.push(timezone);
        this.timezoneSelect.value = '';
        this.renderClocks();
    }
    
    removeTimezone(timezone) {
        this.timezones = this.timezones.filter(tz => tz !== timezone);
        this.renderClocks();
    }
    
    clearAll() {
        if (this.timezones.length === 0) return;
        if (confirm('Are you sure you want to remove all timezones?')) {
            this.timezones = [];
            this.renderClocks();
        }
    }
    
    renderClocks() {
        this.clocksContainer.innerHTML = '';
        
        if (this.timezones.length === 0) {
            this.clocksContainer.innerHTML = '<div class="empty-state">No timezones added. Select one from the dropdown above.</div>';
            this.clearAllBtn.disabled = true;
            return;
        }
        
        this.clearAllBtn.disabled = false;
        
        this.timezones.forEach((timezone, index) => {
            const clockCard = document.createElement('div');
            clockCard.className = 'clock-card';
            if (index % 2 === 0) clockCard.classList.add('dark');
            clockCard.innerHTML = `
                <button class="remove-btn" data-timezone="${timezone}">×</button>
                <div class="timezone-name">${this.formatTimezoneName(timezone)}</div>
                <div class="time-display" data-timezone="${timezone}">--:--:--</div>
                <div class="date-display" data-timezone="${timezone}">Loading...</div>
                <div class="offset-display" data-timezone="${timezone}">UTC</div>
            `;
            
            clockCard.querySelector('.remove-btn').addEventListener('click', (e) => {
                this.removeTimezone(e.target.dataset.timezone);
            });
            
            this.clocksContainer.appendChild(clockCard);
        });
        
        this.updateAllClocks();
    }
    
    updateAllClocks() {
        this.timezones.forEach(timezone => {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            const parts = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).formatToParts(now);
            
            const partsObj = {};
            parts.forEach(part => {
                partsObj[part.type] = part.value;
            });
            
            const time = `${partsObj.hour}:${partsObj.minute}:${partsObj.second}`;
            const date = new Date(partsObj.year, partsObj.month - 1, partsObj.day);
            const dateStr = date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
            
            const offset = this.getUTCOffset(timezone, now);
            
            const timeElement = document.querySelector(`[data-timezone="${timezone}"].time-display`);
            const dateElement = document.querySelector(`[data-timezone="${timezone}"].date-display`);
            const offsetElement = document.querySelector(`[data-timezone="${timezone}"].offset-display`);
            
            if (timeElement) timeElement.textContent = time;
            if (dateElement) dateElement.textContent = dateStr;
            if (offsetElement) offsetElement.textContent = offset;
        });
    }
    
    getUTCOffset(timezone, date) {
        const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
        const diffMs = tzDate - utcDate;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((Math.abs(diffMs) % (1000 * 60 * 60)) / (1000 * 60));
        
        const sign = diffHours >= 0 ? '+' : '-';
        const absHours = Math.abs(diffHours).toString().padStart(2, '0');
        const mins = diffMins.toString().padStart(2, '0');
        
        return `UTC ${sign}${absHours}:${mins}`;
    }
    
    formatTimezoneName(timezone) {
        return timezone.replace(/_/g, ' ');
    }
}

// Initialize the clock when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DigitalClock();
});