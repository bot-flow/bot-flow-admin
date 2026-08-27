export const DEFAULT_BPMN_XML = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_CustomerApproval" targetNamespace="http://bot-flow.local/bpmn">
  <bpmn:process id="Process_CustomerApproval" name="Customer approval" isExecutable="true">
    <bpmn:startEvent id="StartEvent_Request" name="Request received">
      <bpmn:outgoing>Flow_ToCollect</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:userTask id="Task_CollectInformation" name="Collect information">
      <bpmn:incoming>Flow_ToCollect</bpmn:incoming>
      <bpmn:outgoing>Flow_ToReview</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:userTask id="Task_ReviewRequest" name="Review request">
      <bpmn:incoming>Flow_ToReview</bpmn:incoming>
      <bpmn:outgoing>Flow_ToEnd</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:endEvent id="EndEvent_Approved" name="Completed">
      <bpmn:incoming>Flow_ToEnd</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_ToCollect" sourceRef="StartEvent_Request" targetRef="Task_CollectInformation" />
    <bpmn:sequenceFlow id="Flow_ToReview" sourceRef="Task_CollectInformation" targetRef="Task_ReviewRequest" />
    <bpmn:sequenceFlow id="Flow_ToEnd" sourceRef="Task_ReviewRequest" targetRef="EndEvent_Approved" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_CustomerApproval">
    <bpmndi:BPMNPlane id="BPMNPlane_CustomerApproval" bpmnElement="Process_CustomerApproval">
      <bpmndi:BPMNShape id="StartEvent_Request_di" bpmnElement="StartEvent_Request">
        <dc:Bounds x="120" y="172" width="36" height="36" />
        <bpmndi:BPMNLabel><dc:Bounds x="101" y="215" width="75" height="27" /></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_CollectInformation_di" bpmnElement="Task_CollectInformation">
        <dc:Bounds x="230" y="150" width="120" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_ReviewRequest_di" bpmnElement="Task_ReviewRequest">
        <dc:Bounds x="430" y="150" width="120" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_Approved_di" bpmnElement="EndEvent_Approved">
        <dc:Bounds x="630" y="172" width="36" height="36" />
        <bpmndi:BPMNLabel><dc:Bounds x="623" y="215" width="52" height="14" /></bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_ToCollect_di" bpmnElement="Flow_ToCollect">
        <di:waypoint x="156" y="190" /><di:waypoint x="230" y="190" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_ToReview_di" bpmnElement="Flow_ToReview">
        <di:waypoint x="350" y="190" /><di:waypoint x="430" y="190" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_ToEnd_di" bpmnElement="Flow_ToEnd">
        <di:waypoint x="550" y="190" /><di:waypoint x="630" y="190" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
