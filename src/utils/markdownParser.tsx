import React from 'react';

// Optimize: Cache parsed inline content to avoid re-parsing identical strings
const inlineCache = new Map<string, React.ReactNode[]>();

const inlineParse = (line: string): React.ReactNode[] => {
    // Check cache first
    if (inlineCache.has(line)) {
        return inlineCache.get(line)!;
    }

    // Regex to find **bold**, *italic*, and `code` without being greedy
    const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
    const parts = line.split(regex);
    const nodes: React.ReactNode[] = [];
    let key = 0;

    for (let i = 0; i < parts.length; i++) {
        // `split` with capturing groups creates a weird array structure.
        // Even indices are text between matches, odd are the matches themselves + capture groups.
        if (i % 5 === 0 && parts[i]) { // Text between matches
            nodes.push(parts[i]);
            continue;
        }

        const boldContent = parts[i + 1];
        const italicContent = parts[i + 2];
        const codeContent = parts[i + 3];

        if (boldContent) {
            nodes.push(<strong key={key++}>{boldContent}</strong>);
        } else if (italicContent) {
            nodes.push(<em key={key++}>{italicContent}</em>);
        } else if (codeContent) {
            nodes.push(<code key={key++}>{codeContent}</code>);
        }
        
        // Since one match produces 4 extra array items, skip them.
        i += 4;
    }
    
    // Cache the result (limit cache size to prevent memory bloat)
    if (inlineCache.size > 100) {
        const firstKey = inlineCache.keys().next().value;
        if (firstKey !== undefined) {
             inlineCache.delete(firstKey);
        }
    }
    inlineCache.set(line, nodes);
    
    return nodes;
};


/**
 * A simple markdown parser that converts markdown text to React elements.
 * SECURITY NOTE: This parser is safe from XSS attacks because it constructs
 * React elements directly. React automatically escapes string content, preventing
 * malicious scripts from being injected. It does NOT use `dangerouslySetInnerHTML`.
 * @param text The markdown text to parse.
 * @returns A React fragment containing the parsed elements.
 */
export const parseMarkdown = (text: string): React.ReactNode => {
    if (!text) return null;
    
    // Normalize line endings and split into lines
    const lines = text.replace(/\r\n?/g, '\n').split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        // Headers
        if (line.startsWith('#')) {
            const level = line.match(/^#+/)?.[0].length || 0;
            const content = line.substring(level).trim();
            const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
            if (level > 0 && level <= 6) {
                elements.push(React.createElement(Tag, { key: i }, ...inlineParse(content)));
                i++;
                continue;
            }
        }
        
        // Horizontal Rule
        if (line.match(/^(---|___|\*\*\*)$/)) {
            elements.push(<hr key={i} />);
            i++;
            continue;
        }
        
        // Blockquotes
        if (line.startsWith('>')) {
             const quoteLines = [];
             while (i < lines.length && lines[i].startsWith('>')) {
                quoteLines.push(lines[i].substring(1).trim());
                i++;
             }
             elements.push(<blockquote key={`bq-${i}`}>{parseMarkdown(quoteLines.join('\n'))}</blockquote>);
             continue;
        }
        
        // Code blocks
        if (line.startsWith('```')) {
            const lang = line.substring(3).trim();
            const codeLines = [];
            i++;
            while (i < lines.length && !lines[i].startsWith('```')) {
                codeLines.push(lines[i]);
                i++;
            }
            elements.push(<pre key={`pre-${i}`}><code className={`language-${lang}`}>{codeLines.join('\n')}</code></pre>);
            i++; // Skip closing ```
            continue;
        }
        
        // List (Unordered or Ordered)
        const uMatch = line.match(/^(\s*)(\*|-|\+)\s+(.*)/);
        const oMatch = line.match(/^(\s*)(\d+)\.\s+(.*)/);
        if (uMatch || oMatch) {
            const listTag = uMatch ? 'ul' : 'ol';
            const listItems: React.ReactNode[] = [];
            const initialIndent = (uMatch || oMatch)![1].length;

            while (i < lines.length) {
                const itemMatch = lines[i].match(new RegExp(`^\\s{${initialIndent}}(\\*|-|\\+|\\d+\\.)\\s+(.*)`));
                if (!itemMatch) break; // End of list
                
                const itemContent = [itemMatch[2]];
                i++;
                // Check for multi-line list items
                while (i < lines.length && lines[i].match(new RegExp(`^\\s{${initialIndent + 2},}.*`))) {
                    itemContent.push(lines[i].trim());
                    i++;
                }

                listItems.push(<li key={`li-${i}`}>{parseMarkdown(itemContent.join('\n'))}</li>);
            }
            elements.push(React.createElement(listTag, { key: `${listTag}-${i}`}, ...listItems));
            continue;
        }

        // Paragraphs
        if (line.trim() !== '') {
            const paraLines = [line];
            i++;
            while (i < lines.length && lines[i].trim() !== '') {
                paraLines.push(lines[i]);
                i++;
            }
            elements.push(<p key={`p-${i}`}>{inlineParse(paraLines.join(' '))}</p>);
            continue;
        }
        
        // If nothing matches, it's a blank line, so just advance
        i++;
    }

    return <>{elements}</>;
};