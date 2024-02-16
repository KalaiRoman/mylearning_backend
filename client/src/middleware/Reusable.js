import React, { useState } from 'react'

export function Reusable() {
    const [name, setName] = useState("?")
    return { name };
}

