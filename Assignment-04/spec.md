# Stellar Web - Assignment 04 Spec

## Objective
Build an interactive webpage featuring a particle system that creates a "Stellar Web" visualization with user-controllable sliders.

## Core Requirements

- **Nodes**: Particles drifting through 3D space
- **Edges**: Lines connecting nodes based on proximity
- **Connectivity Radius**: Dynamic connectivity threshold controlling which nodes link
- **Sliders**: Real-time control over node count, connectivity radius, edge thickness, edge opacity, node size, speed, and depth effect
- **3D Space**: Depth effects using size and opacity relative to z-position

## Key Concepts
node, edge, thickness, transparency, opacity, connectivity radius, 3D space

## Exploration Ideas

- Varying connectivity radius to observe network density changes
- Color gradients based on edge length or node velocity
- Mouse-driven node attraction/repulsion
- Pulsing effects on nodes or edges
- Depth effects using size and opacity based on z-position

## Stretch Challenge

- Reposition sliders so they don't obscure the animation (collapsible side panels or below-canvas placement)
- Add a "Network Statistics" panel showing real-time metrics: total edges, average connections per node, and network density

## What Was Implemented

- All core requirements (nodes, edges, connectivity radius, sliders, 3D depth)
- Collapsible slider panel on the right side (stretch challenge)
- Network Statistics panel with total edges, avg connections, and density (bonus)
- Color gradients based on edge length
- Pulsing glow on nodes
- Depth effects on both nodes and edges
- Gravity slider for tunable gravitational strength
- Central sun object with dominant gravitational pull (particles orbit it)
- Mass-based particle physics with inter-particle gravity
- Soft repulsion at close range to prevent clumping

## Source
https://www.frontiersof.tech/stellar-web-quest/
