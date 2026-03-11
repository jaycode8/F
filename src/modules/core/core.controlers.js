
export const files = (req, res) => {
    res.render('files', {
        title: 'Dashboard',
        userName: 'Alice',
        userInitial: 'A',
        userEmail: 'alice@local',
        userRole: 'admin',
        totalFiles: 142,
        sharedFiles: 18,
        storageUsed: '4.2 GB',
        storageTotal: '20 GB',
        storagePercent: 21,
        onlineDevices: 3,
        unreadNotifications: true,
        existingFolders: [
            { path: 'projects' },
            { path: 'projects/documents' },
            { path: 'projects/images' },
            { path: 'personal/photos' },
            { path: 'backups' },
        ],
    });
};

export const dashboard = (req, res) => {
    res.render('dashboard', {
        title: 'Dashboard',
        userName: 'Alice',
        userInitial: 'A',
        userEmail: 'alice@local',
        userRole: 'admin',
        totalFiles: 142,
        sharedFiles: 18,
        storageUsed: '4.2 GB',
        storageTotal: '20 GB',
        storagePercent: 21,
        onlineDevices: 3,
        unreadNotifications: true,
        recentFiles: [
            { id: 1, name: 'project_brief.pdf', type: 'pdf', size: '1.2 MB', uploadedBy: 'alice', uploadedAt: '2 min ago' },
            { id: 2, name: 'screenshot.png', type: 'image', size: '840 KB', uploadedBy: 'bob', uploadedAt: '14 min ago' },
            { id: 3, name: 'backup.zip', type: 'archive', size: '320 MB', uploadedBy: 'alice', uploadedAt: '1 hr ago' },
        ]
    });
};

export const signin = (req, res) => {
    res.status(200).render("auth/signin");
}
