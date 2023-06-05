export const date = {
    time(bt?: string | number | Date, et?: string | number | Date, fmt?: string) {
        const b = bt ? new Date(bt).getTime() : -28800000,
            e = et ? new Date(et).getTime() : new Date().getTime(),
            date = new Date(rand.int(b, e));

        return fmt ? formatDate(date, fmt) : date;
    },
    now: (fmt?: string) => fmt ? formatDate(new Date(), fmt) : new Date(),
    year: () => rand.int(1949, 2020),
    month: () => rand.int(1, 12),
    day: () => rand.int(1, 28),
    hour: () => rand.int(1, 24),
    minute: () => rand.int(0, 59),
}