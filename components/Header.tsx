// E:\programming\Project\transvidtexter\components\Header.tsx

import Link from 'next/link';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">TransVidTexter</a>
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link href="/login">
              <a className="nav-link">ログイン</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/signup">
              <a className="nav-link">新規登録</a>
            </Link>
          </li>
          {/* 他のナビゲーションリンクもこちらに追加 */}
        </ul>
      </div>
    </nav>
  );
}
