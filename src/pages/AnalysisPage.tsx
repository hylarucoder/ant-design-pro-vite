import { EllipsisOutlined } from "@ant-design/icons";
import { GridContent } from "@ant-design/pro-components";
import { Col, Dropdown, Row } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import type { Dayjs } from "dayjs";
import { Suspense, useState } from "react";
import IntroduceRow from "@/pages/dashboard/analysis/components/IntroduceRow";
import OfflineData from "@/pages/dashboard/analysis/components/OfflineData";
import PageLoading from "@/pages/dashboard/analysis/components/PageLoading";
import ProportionSales from "@/pages/dashboard/analysis/components/ProportionSales";
import type { TimeType } from "@/pages/dashboard/analysis/components/SalesCard";
import SalesCard from "@/pages/dashboard/analysis/components/SalesCard";
import TopSearch from "@/pages/dashboard/analysis/components/TopSearch";
import type { AnalysisData } from "@/pages/dashboard/analysis/data.d";
import useStyles from "@/pages/dashboard/analysis/style.style";
import { getTimeDistance } from "@/pages/dashboard/analysis/utils/utils";
import { fetchAnalysisData } from "../data/analysis";
import { useAsyncData } from "../hooks/useAsyncData";

type RangePickerValue = RangePickerProps["value"];
type SalesType = "all" | "online" | "stores";

const AnalysisPage = () => {
  const { styles } = useStyles();
  const [salesType, setSalesType] = useState<SalesType>("all");
  const [currentTabKey, setCurrentTabKey] = useState<string>("");
  const [rangePickerValue, setRangePickerValue] = useState<RangePickerValue>(
    getTimeDistance("year"),
  );
  const { loading, data } = useAsyncData<AnalysisData>(fetchAnalysisData, []);

  const selectDate = (type: TimeType) => {
    setRangePickerValue(getTimeDistance(type));
  };
  const handleRangePickerChange = (value: RangePickerValue) => {
    setRangePickerValue(value);
  };
  const isActive = (type: TimeType) => {
    if (!rangePickerValue) {
      return "";
    }
    const value = getTimeDistance(type);
    if (!value) {
      return "";
    }
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return "";
    }
    if (
      rangePickerValue[0].isSame(value[0] as Dayjs, "day") &&
      rangePickerValue[1].isSame(value[1] as Dayjs, "day")
    ) {
      return styles.currentDate;
    }
    return "";
  };

  const salesPieData =
    salesType === "all"
      ? data?.salesTypeData
      : salesType === "online"
        ? data?.salesTypeDataOnline
        : data?.salesTypeDataOffline;

  const dropdownGroup = (
    <span className={styles.iconGroup}>
      <Dropdown
        menu={{
          items: [
            {
              key: "1",
              label: "操作一",
            },
            {
              key: "2",
              label: "操作二",
            },
          ],
        }}
        placement="bottomRight"
      >
        <EllipsisOutlined />
      </Dropdown>
    </span>
  );
  const handleChangeSalesType = (value: SalesType) => {
    setSalesType(value);
  };
  const handleTabChange = (key: string) => {
    setCurrentTabKey(key);
  };
  const activeKey = currentTabKey || data?.offlineData?.[0]?.name || "";

  return (
    <GridContent>
      <Suspense fallback={<PageLoading />}>
        <IntroduceRow loading={loading} visitData={data?.visitData || []} />
      </Suspense>

      <Suspense fallback={null}>
        <SalesCard
          rangePickerValue={rangePickerValue}
          salesData={data?.salesData || []}
          isActive={isActive}
          handleRangePickerChange={handleRangePickerChange}
          loading={loading}
          selectDate={selectDate}
        />
      </Suspense>

      <Row
        gutter={24}
        style={{
          marginTop: 24,
        }}
      >
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Suspense fallback={null}>
            <TopSearch
              loading={loading}
              visitData2={data?.visitData2 || []}
              searchData={data?.searchData || []}
              dropdownGroup={dropdownGroup}
            />
          </Suspense>
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Suspense fallback={null}>
            <ProportionSales
              dropdownGroup={dropdownGroup}
              salesType={salesType}
              loading={loading}
              salesPieData={salesPieData || []}
              handleChangeSalesType={handleChangeSalesType}
            />
          </Suspense>
        </Col>
      </Row>

      <Suspense fallback={null}>
        <OfflineData
          activeKey={activeKey}
          loading={loading}
          offlineData={data?.offlineData || []}
          offlineChartData={data?.offlineChartData || []}
          handleTabChange={handleTabChange}
        />
      </Suspense>
    </GridContent>
  );
};

export default AnalysisPage;
