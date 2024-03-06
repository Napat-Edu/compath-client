'use client'
import { careerpathDataMockResponse } from "@/mock/mock-api-response"
import React, { useState} from 'react';
import ReactFlow, { Background, Controls, Node, Position, useNodesState, useEdgesState, Edge } from 'reactflow';

import 'reactflow/dist/style.css';

export default function NodeTree() {
    const careerpathData = careerpathDataMockResponse;

    const initialNodes: Node[] = []
    const initialEdges: Edge[] = []

    let totalRelated = 0
    let nodeWidth = 400
    let nodeHeight = 30
    let posX = 0
    let posY = 0
    let posY_skill = 0
    let nodeData:Node, edgeData:Edge

    careerpathData.map((careerData, i) => {
        nodeData = {
            id : careerData.career_path_name,
            position : { x : posX , y : posY},
            data : {label : careerData.career_path_name},
            sourcePosition : Position.Right,
            targetPosition : Position.Left,
            draggable : false,
            connectable : false,
            parentNode : '',
        }
        initialNodes.push(nodeData)
        careerData.related_careers.map((relatedCareer,j) => {
            nodeData = {
                id : relatedCareer.career,
                position : { x : 200 , y : posY+5},
                data : {label : relatedCareer.career},
                style : { 
                    width : nodeWidth,
                    height : nodeHeight,
                    lineHeight : 1,
                },
                targetPosition : Position.Left,
                sourcePosition : Position.Right,
                draggable : false,
                connectable : false,
                parentNode : '',
            }
            initialNodes.push(nodeData)
            edgeData = {
                id: `${careerData.career_path_name}->${relatedCareer.career}`, 
                source: careerData.career_path_name, 
                target: relatedCareer.career,
            }
            initialEdges.push(edgeData)
            relatedCareer.skill_domains.map((skill_domains,k) => {
                    nodeData = {
                        id : skill_domains.name+i+j,
                        position : { x : nodeWidth*2 , y : posY},
                        data : {label : skill_domains.name},
                        style : { 
                            width : nodeWidth+100,
                            height : nodeHeight * skill_domains.skill_list.length + 10 * skill_domains.skill_list.length + 60,
                        },
                        targetPosition : Position.Left,
                        type : 'output',
                    }
                    initialNodes.push(nodeData)
                    edgeData = {
                        id: `${relatedCareer.career}->${skill_domains.name+i+j}`, 
                        source: relatedCareer.career, 
                        target: skill_domains.name+i+j,
                    }
                    initialEdges.push(edgeData)

                    posY_skill = 40
                    skill_domains.skill_list.map((skill, l)=> {
                            nodeData = {
                                id : skill.toString()+i+j+k,
                                position : { x : 50 , y : posY_skill},
                                data : {label : skill.toString()},
                                style : { 
                                    width : nodeWidth,
                                    height : nodeHeight,
                                    lineHeight : 1,
                                },
                                parentNode: skill_domains.name+i+j,
                                extent: 'parent',
                                draggable : false,
                                connectable : false,
                            }
                            posY_skill += nodeHeight + 10
                            initialNodes.push(nodeData)
                    })
                posY += posY_skill + 40
            })
            posY += 60
        })

        posY += 80
        totalRelated = careerData.related_careers?.length

        edgeData = {
            id: `compath->${careerData.career_path_name}`, 
            source: 'compath', 
            target: careerData.career_path_name,
        }
        initialEdges.push(edgeData)
    })

    nodeData = {
        id : 'compath',
        position : { x : -nodeWidth , y : posY/2},
        data : {label : 'Compath'},
        sourcePosition : Position.Right,
        type: 'input',
        draggable : false,
        connectable : false,
        parentNode : '',
    }
    initialNodes.push(nodeData)

    const hideNode = (hidden:boolean, idNode:string) => (nodeOrEdge:Node) => {
        if (nodeOrEdge.id == idNode || nodeOrEdge.parentNode == idNode){
            nodeOrEdge.hidden = hidden;
            setEdges((eds: Edge[]) => eds.map(hideEdge(hidden, idNode)))
        }
        return nodeOrEdge;
    };

    const hideEdge = (hidden:boolean, source:string) => (nodeOrEdge:Edge) => {
        if (nodeOrEdge.source == source){
            setNodes((nds: Node[]) => nds.map(hideNode(hidden, nodeOrEdge.target)));
            nodeOrEdge.hidden = hidden;
        }
        return nodeOrEdge;
    };

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [hidden, setHidden] = useState(true);

    const handleHidden = (n: Node)  => {
        setHidden(!hidden)
        setEdges((eds: Edge[]) => eds.map(hideEdge(hidden, n.id)))
    }

    const landingViewport = {
        x : 400,
        y : -posY/2 + 400,
        zoom : 1,
    }

    return (
        <div className='h-full overflow-x-hidden'>
            <ReactFlow
                defaultViewport={landingViewport}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodesConnectable={false}
                nodesDraggable={false}
                onNodeClick={(e, n) => handleHidden(n)}
            >
                <Background />
                <Controls position="bottom-right" />
            </ReactFlow>
        </div>
    )

}

