export function validateMouseBehavior(mousePath: Array<string>, puzzle_slot_left: number, puzzle_piece_left: number): boolean {
    let ToleranceRange: number = 0;

    if (!(Math.abs(puzzle_slot_left - puzzle_piece_left) < 10)) return false;

    // 处理空数组和单元素情况
    if (mousePath.length < 200) return false;

    for (let i: number = 2; i < mousePath.length; i++) {
        const current: number = Number(mousePath[i]);
        const previous: number = Number(mousePath[i - 1]);

        // 遇到无效数值立即终止
        if (isNaN(current) || isNaN(previous)) {
            return false;
        }

        // 差值绝对值检查
        if (Math.abs(current - previous) >= 50) {
            ToleranceRange++;
            if (ToleranceRange >= 3) {
                return false;
            }
        }
    }
    return true;
}