import * as FolderServices from "../folders/folder.services.js";
import * as FileServices from "../files/file.services.js";

export const explore = async (req, res) => {
    try {
        const { folder, page, limit, search } = req.query;
        const owner = "5c69077e-7682-4d89-809c-f6ec2a58f970"; // replace with req.user._id

        // Run both queries in parallel
        const [foldersData, filesData] = await Promise.all([
            FolderServices.list(page, limit, {
                owner,
                parent: folder || null,
                ...(search && { search }),
            }),
            FileServices.list(page, limit, {
                owner,
                folder: folder || null,
                ...(search && { search }),
            }),
        ]);

        // If we're inside a folder, fetch its info for breadcrumb
        let currentFolderData = null;
        if (folder) {
            currentFolderData = await FolderServices.get(folder);
        }

        // Build breadcrumb trail by walking up parents
        const breadcrumbs = [];
        if (currentFolderData) {
            breadcrumbs.unshift({ name: currentFolderData.name, id: currentFolderData._id });
            let parent = currentFolderData.parent;
            while (parent) {
                const p = await FolderServices.get(parent);
                if (!p) break;
                breadcrumbs.unshift({ name: p.name, id: p._id });
                parent = p.parent;
            }
        }

        res.render('explore', {
            title: currentFolderData ? currentFolderData.name : 'Files',
            foldersData,
            filesData,
            currentFolder: folder || null,
            currentFolderData,
            breadcrumbs,
            currentSearch: search || null,
        });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

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
