import mysql from 'mysql2/promise';

import getDataBasePoolConfig from "../../config";
import {learnDataBase} from "../../../types/DataBase/Learn";
import {ReturnType} from "../../../types"

export class learnService {
    /**
     * Database 类的单例实例
     *
     * 该静态属性用于存储 Database 类的唯一实例 确保在整个应用程序中只有一个 Database 实例
     * 通过这种方式 可以有效地管理数据库连接 避免创建多余的连接 从而提高应用程序的性能
     *
     * @private
     * @static
     */
    private static instance: learnService;

    /**
     * 数据库连接池
     *
     * 该属性用于存储数据库连接池实例 该连接池管理多个数据库连接 以供应用程序重复使用
     * 使用连接池可以显著减少建立和关闭数据库连接的开销 提高数据库操作的效率
     *
     * @private
     */
    private pool!: mysql.Pool;

    // 私有构造函数 用于防止直接实例化
    private constructor() {
    }

    /**
     * 异步初始化 Database 实例的工厂方法
     * 该方法用于创建并初始化一个 Database 实例
     * 如果实例已经存在 则直接返回该实例
     * 如果实例不存在 则创建一个新的实例并调用其 initialize 方法进行初始化
     *
     * @returns {Promise<userService>} 返回一个 Promise 该 Promise 解析为 Database 实例。
     */
    public static async create(): Promise<learnService> {
        // 检查是否已经初始化过
        if (!learnService.instance) {
            // 初始化数据库
            learnService.instance = new learnService();
            await learnService.instance.initialize();
        }
        // 返回已经初始化过的数据库
        return learnService.instance;
    }

    /**
     * 向数据库添加新用户
     *
     * 该方法尝试从数据库连接池获取一个连接 然后执行插入操作
     * 插入操作包括模块的邮箱
     *
     * @param email     - 用户邮箱
     *
     * @return {Promise<ReturnType>} 返回一个状态消息
     */
    public async addUser(email: string): Promise<ReturnType> {
        let connection: mysql.PoolConnection | undefined;
        try {
            // 尝试从连接池获取一个连接
            connection = await this.pool.getConnection();
            // 执行插入操作并获取结果
            const [result] = await connection.execute('INSERT INTO userLearn (email, grade, volume, chineseTextbooks, mathematicsTextbooks, englishTextbooks, physicsTextbooks, chemistryTextbooks, biologyTextbooks, historyTextbooks, geographyTextbooks, morality_and_rule_of_lawTextbooks ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [email, '六年级', '上册', '人教版', '人教版', '人教版', '人教版', '人教版', '人教版', '人教版', '人教版', '人教版']);
            // 返回操作成功的信息和结果
            return {success: true, message: '添加成功'};
        } catch (err) {
            // 捕获并打印错误信息
            console.error('添加错误:', err);
            // 返回操作失败的信息和错误详情
            return {success: false, message: String(err)};
        } finally {
            // 确保连接被释放回连接池
            if (connection) {
                connection.release();
            }
        }
    }

    /**
     * 按 邮箱 更新用户信息
     *
     *  该方法尝试从数据库连接池获取一个连接 然后根据提供的用户 邮箱 和更新信息执行更新操作
     *  更新信息是一个对象 键为要更新的字段名 值为新的字段值
     *
     * @param email     - 用户邮箱
     * @param updates   - 需要更新的数据
     *
     * @return {Promise<ReturnType>} 返回一个状态消息
     */
    public async updateUser(email: string, updates: Partial<learnDataBase>): Promise<ReturnType> {
        let connection: mysql.PoolConnection | undefined;
        try {
            // 尝试从连接池获取一个连接
            connection = await this.pool.getConnection();

            // 获取更新信息的键和值
            const keys: string[] = Object.keys(updates);
            const values: string[] = Object.values(updates);

            // 创建 SQL 更新语句的 SET 子句
            const setClause: string = keys.map((key: string): string => `${key} = ?`).join(', ');

            // 构建完整的 SQL 更新语句
            const sql = `UPDATE userLearn
                         SET ${setClause}
                         WHERE email = ?`;

            // 拼接 SQL 语句的参数
            const params: string[] = [...values, email];

            // 执行更新操作
            await connection.execute(sql, params);

            // 打印更新成功的日志
            console.log(`用户 ${email} 数据更新成功!`);

            // 返回操作成功的信息
            return {success: true, message: '数据更新成功'};
        } catch (err) {
            // 捕获并记录错误信息
            console.error('数据更新错误:', err);

            // 返回操作失败的信息
            return {success: false, message: '数据更新错误 请联系客服'};
        } finally {
            // 确保连接被释放回连接池
            if (connection) {
                connection.release(); // 将连接释放回池
            }
        }
    }

    /**
     * 关闭数据库连接
     * @return {Promise<void>}
     */
    public async close(): Promise<void> {
        await this.pool.end(); // 关闭数据库
    }

    /**
     * 根据指定列和值获取用户信息的异步方法
     *
     * 该方法尝试从数据库连接池获取一个连接 然后根据提供的列名和值查询用户信息
     * 可查询的列包括用户的名称（name） 电子邮件（email）和Cookie（cookie）
     *
     * @param column    - 要查询的列名
     * @param value     - 要匹配列的值
     * @returns {Promise<[learnDataBase] | undefined>} 返回一个 Promise 该 Promise 解析为包含用户信息的数组 如果未找到用户则返回 undefined
     */
    public async getUser(column: 'email', value: string): Promise<[learnDataBase] | undefined> {
        let connection: mysql.PoolConnection | undefined;
        try {
            // 尝试从连接池获取一个连接
            connection = await this.pool.getConnection();
            // 执行查询操作并获取结果
            const [rows] = await connection.execute(`SELECT *
                                                     FROM userLearn
                                                     WHERE ${column} = ?`, [value]);
            // 检查结果是否为数组且包含至少一个元素 如果是则返回结果 否则返回 undefined
            return Array.isArray(rows) && rows.length > 0 ? (rows as [learnDataBase]) : undefined;
        } catch (err) {
            // 捕获并记录错误信息
            console.error('获取错误:', err);
            // 返回 undefined 表示查询失败
            return undefined;
        } finally {
            // 确保连接被释放回连接池
            if (connection) {
                connection.release(); // 将连接释放回池
            }
        }
    }

    /**
     * 根据指定列和值删除用户的异步方法
     *
     * 该方法尝试从数据库连接池获取一个连接 然后根据提供的列名和值执行删除操作。
     * 可以根据用户名、电子邮件或 cookie 删除用户。
     *
     * @param column    - 指定用于删除用户的列名
     * @param value     - 指定列的值
     * @returns {Promise<boolean>} 返回一个 Promise 该 Promise 解析为表示操作是否成功的布尔值。
     * @throws {Error} 如果删除操作失败 则抛出错误 并提供失败信息。
     */
    public async deleteUser(column: 'email', value: string): Promise<boolean> {
        let connection: mysql.PoolConnection | undefined;
        try {
            // 尝试从连接池获取一个连接
            connection = await this.pool.getConnection();
            // 执行删除操作并获取结果
            const [result] = await connection.execute(`DELETE
                                                       FROM userLearn
                                                       WHERE ${column} = ?`, [value]);
            // 根据受影响的行数判断操作是否成功
            return (result as mysql.ResultSetHeader).affectedRows > 0;
        } catch (err) {
            // 捕获并记录错误信息
            console.error('删除错误:', err);
            // 抛出错误 并提供失败信息
            throw new Error(`未能删除用户 ${column}`);
        } finally {
            // 确保连接被释放回连接池
            if (connection) {
                connection.release();
            }
        }
    }

    /**
     * 初始化数据库连接池的私有异步方法
     *
     * 该方法负责设置数据库连接池并对其进行测试 以确保连接可用。
     * 它首先获取数据库连接池的配置信息 然后创建连接池实例 并设置相关参数。
     * 如果初始化成功 它将调用 testConnection 方法来验证连接是否有效。
     *
     * @returns {Promise<void>} 返回一个 Promise 该 Promise 在初始化完成后解析。
     * @throws {Error} 如果初始化过程中出现错误 则抛出错误 并提供失败信息。
     */
    private async initialize(): Promise<void> {
        try {
            // 获取数据库连接池的配置信息
            const config = await getDataBasePoolConfig();
            // 创建数据库连接池实例 并设置相关参数
            this.pool = mysql.createPool({
                ...config.DataBase.pool, // 展开配置对象
                waitForConnections: true, // 当没有可用连接时 等待连接
                connectionLimit: 10, // 连接池中最大的连接数量
                queueLimit: 50 // 当连接池中的所有连接都在使用时 队列中等待的最大请求数量
            });
            // 测试数据库连接是否有效
            await this.testConnection();
        } catch (err) {
            // 捕获并记录错误信息
            console.error('数据库初始化失败:', err);
        }
    }

    /**
     * 测试数据库连接的异步方法
     *
     * 该方法用于测试数据库连接是否正常工作。
     * 它尝试从数据库连接池获取一个连接 并在成功获取连接后立即将其释放回连接池。
     * 如果在此过程中没有抛出异常 则表示连接池和数据库连接正常。
     *
     * @returns {Promise<void>} 返回一个 Promise 该 Promise 在连接测试成功时解析 不包含任何值。
     */
    private async testConnection(): Promise<void> {
        const connection = await this.pool.getConnection();
        connection.release(); // 连接释放回池
    }

}
