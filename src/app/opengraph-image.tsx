import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'MM·Money — Rare banknotes of the world';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const font = await readFile(join(process.cwd(), 'assets/Spectral-Light.ttf'));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          background: '#13110e',
          padding: '80px 96px',
          fontFamily: 'Spectral',
        }}
      >
        {/* Top decorative line */}
        <div style={{ width: 56, height: 2, background: '#c8a35a', marginBottom: 48, display: 'flex' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 28 }}>
          <span style={{ fontSize: 88, fontWeight: 300, color: '#c8a35a', lineHeight: 1, letterSpacing: '-0.02em' }}>MM</span>
          <span style={{ fontSize: 88, fontWeight: 300, color: '#f3ecdc', lineHeight: 1, letterSpacing: '-0.02em' }}>·Money</span>
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 30, fontWeight: 300, color: '#a59b86', letterSpacing: '0.01em', marginBottom: 56, display: 'flex' }}>
          Rare banknotes of the world
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 22, fontWeight: 300, color: '#f3ecdc' }}>4,000+</span>
            <span style={{ fontSize: 14, color: '#a59b86', letterSpacing: '0.1em' }}>CATALOGUED PIECES</span>
          </div>
          <div style={{ width: 1, height: 40, background: '#332d24', display: 'flex' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 22, fontWeight: 300, color: '#f3ecdc' }}>208</span>
            <span style={{ fontSize: 14, color: '#a59b86', letterSpacing: '0.1em' }}>COUNTRIES</span>
          </div>
          <div style={{ width: 1, height: 40, background: '#332d24', display: 'flex' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 22, fontWeight: 300, color: '#f3ecdc' }}>mmmoneybanknotes.com</span>
            <span style={{ fontSize: 14, color: '#a59b86', letterSpacing: '0.1em' }}>COLLECTOR STORE</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Spectral',
          data: font,
          style: 'normal',
          weight: 300,
        },
      ],
    }
  );
}
