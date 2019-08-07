export const parseCreatedAt = timestamp => {
    const parsedTimestamp = Date.now() - Date.parse(timestamp);
    const s = Math.floor(parsedTimestamp / 1000);
    const m = Math.floor(s / 60);
    if (m === 0) {
        return `${s}초 전`;
    } else {
        const h = Math.floor(m / 60);
        if (h === 0) {
            return `${m}분 전`;
        } else {
            const d = Math.floor(h / 24);
            if (d === 0) {
                return `${h}시간 전`;
            } else {
                const mm = Math.floor(d / 30);
                if (mm === 0) {
                    return `${d}일 전`;
                } else {
                    const yy = Math.floor(mm / 12);
                    if (yy === 0) {
                        return `${mm}개월 전`;
                    } else {
                        return `${yy}년 전`;
                    }
                }
            }
        }
    }
};
