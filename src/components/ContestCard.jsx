import { useEffect, useState } from "react";
import { Bell, BellOff, Check, ExternalLink } from "lucide-react";

function getCountdown(startTime) {
  const now = new Date();
  const start = new Date(startTime);
  const diff = start - now;

  if (diff <= 0) return { text: "Contest Started!", isStarted: true };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { 
    text: `Starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`, 
    isStarted: false,
    totalSeconds: Math.floor(diff / 1000)
  };
}

export default function ContestCard({ title, link, startTime, logo }) {
  const [countdown, setCountdown] = useState(getCountdown(startTime));
  const [isNotified, setIsNotified] = useState(false);
  const [hasNotificationPermission, setHasNotificationPermission] = useState(false);

  useEffect(() => {
    // Check if this contest is already in notifications
    const notifications = JSON.parse(localStorage.getItem('contestNotifications') || '[]');
    const isAlreadyNotified = notifications.some(n => n.title === title && n.startTime === startTime);
    setIsNotified(isAlreadyNotified);

    // Check notification permission
    if ('Notification' in window) {
      setHasNotificationPermission(Notification.permission === 'granted');
    }
  }, [title, startTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newCountdown = getCountdown(startTime);
      setCountdown(newCountdown);

      // Check if we should send notification
      if (isNotified && !newCountdown.isStarted) {
        const notifications = JSON.parse(localStorage.getItem('contestNotifications') || '[]');
        const notification = notifications.find(n => n.title === title && n.startTime === startTime);
        
        if (notification && !notification.notificationSent) {
          // Send notification when 15 minutes or less remaining
          if (newCountdown.totalSeconds <= 900) { // 15 minutes
            sendNotification();
            // Mark as sent
            const updatedNotifications = notifications.map(n => 
              n.title === title && n.startTime === startTime 
                ? { ...n, notificationSent: true }
                : n
            );
            localStorage.setItem('contestNotifications', JSON.stringify(updatedNotifications));
          }
        }
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [startTime, isNotified, title]);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setHasNotificationPermission(permission === 'granted');
      return permission === 'granted';
    }
    return false;
  };

  const sendNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(`Contest Starting Soon! 🚀`, {
        body: `${title} starts in less than 15 minutes!`,
        icon: logo || '/favicon.ico',
        badge: logo || '/favicon.ico',
        tag: `contest-${title}-${startTime}`,
        requireInteraction: true,
        actions: [
          {
            action: 'view',
            title: 'Go to Contest'
          }
        ]
      });

      notification.onclick = () => {
        window.open(link, '_blank');
        notification.close();
      };

      // Auto close after 10 seconds
      setTimeout(() => notification.close(), 10000);
    }
  };

  const handleGetNotified = async () => {
    if (!hasNotificationPermission) {
      const granted = await requestNotificationPermission();
      if (!granted) {
        showToast('Please enable notifications to get contest reminders!', 'error');
        return;
      }
    }

    const notifications = JSON.parse(localStorage.getItem('contestNotifications') || '[]');
    
    if (isNotified) {
      // Remove notification
      const filtered = notifications.filter(n => !(n.title === title && n.startTime === startTime));
      localStorage.setItem('contestNotifications', JSON.stringify(filtered));
      setIsNotified(false);
      showToast('Notification disabled for this contest', 'info');
    } else {
      // Add notification
      const newNotification = {
        title,
        startTime,
        link,
        logo,
        notificationSent: false,
        createdAt: new Date().toISOString()
      };
      notifications.push(newNotification);
      localStorage.setItem('contestNotifications', JSON.stringify(notifications));
      setIsNotified(true);
      showToast('You\'ll be notified 15 minutes before the contest starts!', 'success');
    }
  };

  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    toast.className = `fixed top-20 right-4 ${bgColor} text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-slide-up max-w-sm`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  };

  const formatStartTime = (startTime) => {
    return new Date(startTime).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card group hover:scale-105 transform transition-all duration-300 animate-slide-up">
      {/* Platform Logo */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 rounded-2xl flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
          <img 
            src={logo || "/src/assets/logos/default.png"} 
            alt="Platform logo" 
            className="h-full w-auto object-contain" 
            onError={(e) => {
              e.target.src = "/src/assets/logos/default.png";
            }}
          />
        </div>
      </div>

      {/* Contest Title */}
      <h3 className="text-lg font-bold text-center mb-3 text-zinc-900 dark:text-white leading-tight">
        {title}
      </h3>

      {/* Start Time */}
      <div className="text-center mb-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
          📅 {formatStartTime(startTime)}
        </p>
        <p className={`text-sm font-medium ${countdown.isStarted ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
          {countdown.text}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <button 
          onClick={handleGetNotified}
          disabled={countdown.isStarted}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 focus-ring ${
            countdown.isStarted 
              ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed'
              : isNotified 
                ? 'bg-green-100 dark:bg-green-950/20 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-700 hover:bg-green-200 dark:hover:bg-green-900/30'
                : 'bg-blue-100 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-900/30'
          }`}
          title={
            countdown.isStarted 
              ? 'Contest has started' 
              : isNotified 
                ? 'Click to disable notifications' 
                : 'Get notified 15 minutes before start'
          }
        >
          {countdown.isStarted ? (
            <>
              <Check className="h-4 w-4" />
              Started
            </>
          ) : isNotified ? (
            <>
              <BellOff className="h-4 w-4" />
              Notifying
            </>
          ) : (
            <>
              <Bell className="h-4 w-4" />
              Get Notified
            </>
          )}
        </button>

        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-zinc-800 to-zinc-900 dark:from-zinc-700 dark:to-zinc-800 hover:from-zinc-900 hover:to-zinc-950 dark:hover:from-zinc-600 dark:hover:to-zinc-700 text-white text-sm font-medium transition-all duration-300 transform hover:scale-105 focus-ring"
        >
          <ExternalLink className="h-4 w-4" />
          View Contest
        </a>
      </div>

      {/* Notification Status */}
      {isNotified && !countdown.isStarted && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-950/20 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Notifications enabled
          </div>
        </div>
      )}
    </div>
  );
}
