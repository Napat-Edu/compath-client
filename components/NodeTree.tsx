'use client'
import { useEffect, useState } from "react";
import ReactFlow, { Background, Controls, Edge, Node, Position, useEdgesState, useNodesState } from "reactflow";
import Icon from "./Icon";
import { ICareerNodeTree } from "@/interfaces/career-prediction.interface";

import 'reactflow/dist/style.css';

export default function NodeTree() {
    const [isLoading, setIsLoading] = useState(true);
    const [landingViewport, setLandingViewport] = useState({
        x: 0,
        y: 0,
        zoom: 1,
    });

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [hidden, setHidden] = useState(true);

    const getCareerPathData = async () => {
        const careerPathData = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_EXPLORATION_ENDPOINT}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => response.json());
        return careerPathData;
    };

    const initNodeTree = async () => {
        const careerPathData: ICareerNodeTree[] = await getCareerPathData();

        const initialNodes: Node[] = [];
        const initialEdges: Edge[] = [];
        const posX = 0;
        let posY = 0;
        const nodeWidth = 400;
        const nodeHeight = 30;
        careerPathData.map((careerPath, careerpathIdx) => {
            const newNodeData = {
                id: careerPath.career_path_name,
                position: { x: posX, y: posY },
                data: { label: careerPath.career_path_name },
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
                draggable: false,
                connectable: false,
                parentNode: '',
            }
            initialNodes.push(newNodeData);

            careerPath.related_careers.map((career, careerIdx) => {
                const newNodeData = {
                    id: career.career,
                    position: { x: 200, y: posY + 5 },
                    data: { label: career.career },
                    style: {
                        width: nodeWidth,
                        height: nodeHeight,
                        lineHeight: 1,
                    },
                    targetPosition: Position.Left,
                    sourcePosition: Position.Right,
                    draggable: false,
                    connectable: false,
                    parentNode: '',
                }
                initialNodes.push(newNodeData);
                const newEdgeData = {
                    id: `${careerPath.career_path_name}->${career.career}`,
                    source: careerPath.career_path_name,
                    target: career.career,
                }
                initialEdges.push(newEdgeData);

                career.skill_domains.map((domain, domainIdx) => {
                    const newNodeData = {
                        id: domain.name + careerpathIdx + careerIdx,
                        position: { x: nodeWidth * 2, y: posY },
                        data: { label: domain.name },
                        style: {
                            width: nodeWidth + 100,
                            height: nodeHeight * domain.skill_list.length + 10 * domain.skill_list.length + 60,
                        },
                        targetPosition: Position.Left,
                        type: 'output',
                    }
                    initialNodes.push(newNodeData);

                    const newEdgeData = {
                        id: `${career.career}->${domain.name + careerpathIdx + careerIdx + domainIdx}`,
                        source: career.career,
                        target: domain.name + careerpathIdx + careerIdx,
                    }
                    initialEdges.push(newEdgeData);

                    let posY_skill = 40;
                    domain.skill_list.map((skill) => {
                        const newNodeData: Node = {
                            id: skill.toString() + careerpathIdx + careerIdx + domainIdx,
                            position: { x: 50, y: posY_skill },
                            data: { label: skill.toString() },
                            style: {
                                width: nodeWidth,
                                height: nodeHeight,
                                lineHeight: 1,
                            },
                            parentNode: domain.name + careerpathIdx + careerIdx,
                            extent: 'parent',
                            draggable: false,
                            connectable: false,
                        }
                        posY_skill += nodeHeight + 10;
                        initialNodes.push(newNodeData);
                    });
                    posY += posY_skill + 40
                });
                posY += 60
            });
            posY += 80

            // const totalRelated = careerPath.related_careers.length;
            const newEdgeData = {
                id: `compath->${careerPath.career_path_name}`,
                source: 'compath',
                target: careerPath.career_path_name,
            }
            initialEdges.push(newEdgeData)
        });

        const newNodeData = {
            id: 'compath',
            position: { x: -nodeWidth, y: posY / 2 },
            data: { label: 'Compath' },
            sourcePosition: Position.Right,
            type: 'input',
            draggable: false,
            connectable: false,
            parentNode: '',
        }
        initialNodes.push(newNodeData)

        setNodes(initialNodes);
        setEdges(initialEdges);
        setLandingViewport({
            x: 400,
            y: -posY / 2 + 400,
            zoom: 1,
        });
    };

    useEffect(() => {
        setIsLoading(true);
        initNodeTree();
        setIsLoading(false);

        return () => { };
    }, []);

    const hideNode = (isHidden: boolean, nodeId: string) => (nodeOrEdge: Node) => {
        if (nodeOrEdge.id == nodeId || nodeOrEdge.parentNode == nodeId) {
            nodeOrEdge.hidden = isHidden;
            setEdges((eds: Edge[]) => eds.map(hideEdge(isHidden, nodeId)))
        }
        return nodeOrEdge;
    };

    const hideEdge = (isHidden: boolean, source: string) => (nodeOrEdge: Edge) => {
        if (nodeOrEdge.source == source) {
            setNodes((nds: Node[]) => nds.map(hideNode(isHidden, nodeOrEdge.target)));
            nodeOrEdge.hidden = isHidden;
        }
        return nodeOrEdge;
    };

    const handleHidden = (n: Node) => {
        setHidden(!hidden)
        setEdges((eds: Edge[]) => eds.map(hideEdge(hidden, n.id)))
    }

    return (
        !isLoading ?
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
            </ReactFlow> :
            <div className="h-full w-full flex justify-center items-center">
                <Icon name={"Loader2"} className={`animate-spin`} size={64} />
            </div>
    );
}