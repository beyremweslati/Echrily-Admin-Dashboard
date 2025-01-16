import { useMemo } from "react";

const useOrderMetrics = (orders) => {
  return useMemo(() => {
    const completedOrders = orders.filter(
      (order) => order.status === "Completed"
    );

    const totalGamesOrdered = orders.reduce(
      (sum, order) => sum + order.items.length,
      0
    );

    const gamesSold = completedOrders.reduce(
      (sum, order) => sum + order.items.length,
      0
    );

    const percentageSold = (
      totalGamesOrdered === 0 ? 0 : (gamesSold / totalGamesOrdered) * 100
    ).toFixed(1);

    const totalRevenue = completedOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );
    return { completedOrders, totalRevenue, gamesSold, percentageSold };
  }, [orders]);
};
export default useOrderMetrics;
