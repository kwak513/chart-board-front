import { Button, Flex, Input, Modal } from "antd";

interface AddToDashBoardBtn{
    barX ?: string;
    barY ?: string;
    barColor ?: string;
    lineX ?: string;
    lineY ?: string;
    scatterX ?: string;
    scatterY ?: string;
    scatterColor ?: string;
    handleAddChart : () => void;
    isModalOpen : boolean;
    showModal : () => void;
    handleOk : () => void;
    handleCancel : () => void;
    chartName: string;
    setChartName: (value: string) => void;
}

const AddToDashBoardBtnComponent = ({barX, barY, barColor, lineX, lineY, scatterX, scatterY, scatterColor, handleAddChart, isModalOpen, showModal, handleOk, handleCancel, chartName, setChartName}: AddToDashBoardBtn) => {
    return (  
        <>
        {((barX.length > 0 || barY.length > 0 || barColor.length > 0) || (lineX.length > 0 || lineY.length > 0) || (scatterX.length > 0 || scatterY.length > 0 || scatterColor.length > 0)) &&
            

            <>
                <Flex justify="end" style={{ marginTop: "10px" }}>
                    <Button type="primary" onClick={showModal}>
                    차트 저장
                    </Button>
                </Flex>
                
                <Modal title="차트 저장" open={isModalOpen} 
                    onOk={() => {
                        handleAddChart();
                        handleOk();
                    }} 
                    onCancel={handleCancel}>
                    <Input value={chartName} onChange={(e) => setChartName(e.target.value)} placeholder="차트 이름"/>
                </Modal>
            </>

        
            // <Flex justify="end" style={{ marginTop: "10px" }}>
            //     <Button type="primary" onClick={handleAddToDashboard}>
            //         차트 저장
            //     </Button>
            // </Flex>
            }

        </>
    );
}
 
export default AddToDashBoardBtnComponent;