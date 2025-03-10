import multer from 'multer';
import {UserService} from "../../services/user.service";
import path from "path";

// 配置 Multer
const storage = multer.diskStorage({
    destination: 'public/portraitLib/', filename: async (req, file, cb) => {
        const cookies = req.cookies;
        const user = await UserService.getUserByCookies(cookies);

        if (user) {
            const uniqueName = `${user.email}${path.extname(file.originalname)}`;
            cb(null, uniqueName);
        }
    }
});

// 安全过滤配置
const upLoadPortrait = multer({
    storage, limits: {fileSize: 5 * 1024 * 1024}, // 5MB限制
    fileFilter: (_req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.mimetype)) return cb(new Error('不支持的文件类型'));
        cb(null, true);
    }
});

export default upLoadPortrait