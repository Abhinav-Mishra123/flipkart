"use client"
import Link from 'next/link';
import { usePathname} from 'next/navigation';
import React from 'react';

const NextBreadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  // Helper to convert segment to readable text
  const formatSegment = (segment: string) => {
    return segment.replace(/-/g, ' ').toLowerCase();
  };

  return (
    <nav aria-label="breadcrumb">
      <ul className="breadcrumb mt-1 flex text-gray-600">
        <li>
          <Link href="/">
            <span className="hover:underline">Home</span>
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('>');

          return (
            <li key={href} className="flex items-center">
              <span className="mx-2">&#129170;</span>
              {index !== pathSegments.length -1 ? (
              <Link href={href}>
                <span className="hover:underline">
                  {formatSegment(segment)}
                </span>
              </Link>
              ): (
                <span>{formatSegment(segment)}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NextBreadcrumb;
