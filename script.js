
(() => {
  "use strict";

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];

  const STORAGE = {
    user: "nsutconnect_user_v1",
    theme: "nsutconnect_theme_v1",
    posts: "nsutconnect_posts_v1",
    announcements: "nsutconnect_announcements_v1",
    timetable: "nsutconnect_timetable_v1",
    likes: "nsutconnect_likes_v1"
  };

  const seedPosts = [
    {
      id: "p1",
      author: "Rhea Kapoor",
      initials: "RK",
      role: "2nd year · CSE",
      title: "Anyone building something cool this semester?",
      body: "Looking to team up with people who enjoy building useful things. I'm exploring a campus utility app and would love to meet designers or developers who want to ship a real project.",
      category: "Tech",
      kind: "discussion",
      time: "12 min ago",
      likes: 18,
      comments: [
        {
          author: "Aarav Mehta",
          text: "Would love to chat — working on a similar idea!",
          time: "8 min ago"
        }
      ]
    },
    {
      id: "p2",
      author: "Kabir Malhotra",
      initials: "KM",
      role: "1st year · ECE",
      title: "Best places to study between classes?",
      body: "Library gets packed around lunch. Any quiet spots on campus where I can sit with my laptop and get work done?",
      category: "Campus life",
      kind: "question",
      time: "35 min ago",
      likes: 12,
      comments: [
        {
          author: "Mehak S.",
          text: "Try the quieter corners on the upper floor of the library.",
          time: "20 min ago"
        },
        {
          author: "Dev B.",
          text: "The department common area is decent after 3 PM.",
          time: "11 min ago"
        }
      ]
    },
    {
      id: "p3",
      author: "Ananya Verma",
      initials: "AV",
      role: "3rd year · IT",
      title: "Hackathon team looking for a frontend dev",
      body: "We're prototyping a tool for student communities and need one more frontend developer. React experience is a plus, but curiosity and consistency matter more. Drop a comment if interested.",
      category: "Tech",
      kind: "discussion",
      time: "1 hr ago",
      likes: 26,
      comments: []
    },
    {
      id: "p4",
      author: "Ishaan Gupta",
      initials: "IG",
      role: "2nd year · Mechanical",
      title: "What events are you most excited for this month?",
      body: "Trying to plan around classes and club work. Share the events, workshops, or competitions you think are worth checking out!",
      category: "Events",
      kind: "question",
      time: "2 hrs ago",
      likes: 9,
      comments: []
    }
  ];

  const seedAnnouncements = [
    {
      id: "a1",
      title: "Mid-semester schedule: check your dates",
      body: "The tentative mid-semester examination schedule is being coordinated by departments. Keep an eye on official department notices for confirmed dates and room details.",
      category: "Academic",
      priority: "Important",
      date: "Oct 14",
      time: "Today"
    },
    {
      id: "a2",
      title: "Campus innovation meetup",
      body: "Bring your ideas, prototypes, or just your curiosity. Meet fellow builders, exchange feedback, and find teammates for your next project.",
      category: "Events",
      priority: "Normal",
      date: "Oct 16",
      time: "Yesterday"
    },
    {
      id: "a3",
      title: "Applications open: student project showcase",
      body: "Students working on software, hardware, research, or social-impact projects can prepare a short overview for the upcoming showcase. Check official channels for the final submission form.",
      category: "Opportunities",
      priority: "Urgent",
      date: "Oct 18",
      time: "2 days ago"
    }
  ];

  const seedTimetable = {
    Monday: [
      {
        time: "09:00 – 10:00",
        name: "Mathematics II",
        location: "Lecture Hall 2",
        type: "Lecture"
      },
      {
        time: "10:00 – 11:00",
        name: "Data Structures",
        location: "Room 204",
        type: "Lecture"
      },
      {
        time: "11:30 – 13:00",
        name: "Digital Logic Design",
        location: "Room 108",
        type: "Lecture"
      },
      {
        time: "14:00 – 16:00",
        name: "Programming Lab",
        location: "Lab 3",
        type: "Lab"
      },
      {
        time: "16:00 – 17:00",
        name: "Independent study",
        location: "Library",
        type: "Study"
      }
    ],

    Tuesday: [
      {
        time: "09:00 – 10:00",
        name: "Engineering Physics",
        location: "Lecture Hall 1",
        type: "Lecture"
      },
      {
        time: "10:30 – 12:00",
        name: "Data Structures",
        location: "Room 204",
        type: "Tutorial"
      },
      {
        time: "13:00 – 14:00",
        name: "Communication Skills",
        location: "Room 112",
        type: "Lecture"
      },
      {
        time: "15:00 – 16:00",
        name: "Coding practice",
        location: "Library",
        type: "Study"
      }
    ],

    Wednesday: [
      {
        time: "09:00 – 10:00",
        name: "Mathematics II",
        location: "Lecture Hall 2",
        type: "Lecture"
      },
      {
        time: "11:00 – 13:00",
        name: "Physics Lab",
        location: "Lab 2",
        type: "Lab"
      },
      {
        time: "14:00 – 15:00",
        name: "Design thinking",
        location: "Room 301",
        type: "Tutorial"
      }
    ],

    Thursday: [
      {
        time: "10:00 – 11:00",
        name: "Digital Logic Design",
        location: "Room 108",
        type: "Lecture"
      },
      {
        time: "11:00 – 12:00",
        name: "Engineering Physics",
        location: "Lecture Hall 1",
        type: "Lecture"
      },
      {
        time: "14:00 – 16:00",
        name: "Project work",
        location: "Innovation Lab",
        type: "Study"
      }
    ],

    Friday: [
      {
        time: "09:00 – 10:00",
        name: "Data Structures",
        location: "Room 204",
        type: "Lecture"
      },
      {
        time: "10:30 – 12:30",
        name: "Digital Logic Lab",
        location: "Lab 1",
        type: "Lab"
      },
      {
        time: "13:30 – 14:30",
        name: "Mentor hour",
        location: "Department",
        type: "Tutorial"
      },
      {
        time: "15:00 – 16:00",
        name: "Club meeting",
        location: "Student Hub",
        type: "Club"
      }
    ],

    Saturday: [
      {
        time: "10:00 – 12:00",
        name: "Project sprint",
        location: "Library",
        type: "Study"
      }
    ]
  };

  function load(key, fallback) {
    try {
      const value = localStorage.getItem(key);

      return value
        ? JSON.parse(value)
        : JSON.parse(JSON.stringify(fallback));
    } catch {
      return JSON.parse(JSON.stringify(fallback));
    }
  }

  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("Local storage unavailable", error);
    }
  }

  let user = load(STORAGE.user, null);
  let posts = load(STORAGE.posts, seedPosts);
  let announcements = load(
    STORAGE.announcements,
    seedAnnouncements
  );
  let timetable = load(STORAGE.timetable, seedTimetable);
  let likedPosts = load(STORAGE.likes, []);

  let currentPage = "dashboard";
  let feedFilter = "all";
  let announcementFilter = "All";
  let selectedDay = "Monday";
  let activeCommentPost = null;
  let searchQuery = "";

  const escapeHTML = value =>
    String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]));

  const initials = name =>
    String(name || "Student")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(part => part[0] || "")
      .join("")
      .toUpperCase();

  const shortDate = text => {
    const match = String(text).match(
      /([A-Z][a-z]{2})\s+(\d{1,2})/
    );

    return match
      ? {
          month: match[1].toUpperCase(),
          day: match[2]
        }
      : {
          month: "OCT",
          day: "12"
        };
  };

  function toast(message) {
    const element = $("#toast");

    element.textContent = message;
    element.classList.add("show");

    clearTimeout(toast.timer);

    toast.timer = setTimeout(() => {
      element.classList.remove("show");
    }, 2600);
  }

  function openModal(id) {
    const element = document.getElementById(id);

    if (!element) return;

    element.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    const input = $("input, textarea, select", element);

    if (input) {
      setTimeout(() => input.focus(), 50);
    }
  }

  function closeModals() {
    $$(".modal-backdrop").forEach(element => {
      element.classList.add("hidden");
    });

    document.body.style.overflow = "";
  }

  function setTheme(theme) {
    document.body.classList.toggle(
      "light",
      theme === "light"
    );

    save(STORAGE.theme, theme);

    $("#theme-icon").textContent =
      theme === "light" ? "☾" : "☼";

    $("#top-theme-toggle").textContent =
      theme === "light" ? "☾" : "☼";
  }

  function goToPage(page) {
    if (!document.getElementById(`page-${page}`)) {
      return;
    }

    currentPage = page;

    $$(".page").forEach(element => {
      element.classList.toggle(
        "active-page",
        element.id === `page-${page}`
      );
    });

    $$(".nav-item").forEach(element => {
      element.classList.toggle(
        "active",
        element.dataset.page === page
      );
    });

    const labels = {
      dashboard: "Overview",
      feed: "Discussions",
      announcements: "Announcements",
      timetable: "Timetable",
      profile: "My profile"
    };

    $("#page-label").textContent =
      labels[page] || "Campus";

    if (page === "dashboard") renderDashboard();
    if (page === "feed") renderFeed();
    if (page === "announcements") renderAnnouncements();
    if (page === "timetable") renderTimetable();
    if (page === "profile") renderProfile();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function enterApp() {
    $("#login-screen").classList.add("hidden");
    $("#app").classList.remove("hidden");

    $("#welcome-name").textContent =
      (user.name || "there").trim().split(/\s+/)[0];

    $("#top-avatar").textContent =
      initials(user.name)[0] || "S";

    $("#top-avatar").title = user.name || "Profile";

    $("#admin-add-announcement").classList.toggle(
      "hidden",
      user.role !== "admin"
    );

    setTheme(load(STORAGE.theme, "dark"));

    updateStats();
    renderDashboard();
    renderProfile();
  }

  function signOut() {
    user = null;

    save(STORAGE.user, null);

    $("#app").classList.add("hidden");
    $("#login-screen").classList.remove("hidden");

    $("#login-form").reset();

    closeModals();

    toast("Signed out of the demo.");
  }

  function renderDashboard() {
    updateStats();

    $("#dashboard-posts").innerHTML =
      posts
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .slice(0, 3)
        .map(post => `
          <div class="compact-post">
            <div class="post-avatar">
              ${escapeHTML(post.initials || initials(post.author))}
            </div>

            <div class="compact-post-main">
              <h4>${escapeHTML(post.title)}</h4>

              <p>${escapeHTML(post.body)}</p>

              <div class="compact-meta">
                <span>♡ ${post.likes}</span>
                <span>▤ ${post.comments.length} comments</span>
                <span>${escapeHTML(post.category)}</span>
              </div>
            </div>
          </div>
        `)
        .join("") ||
      `<p class="muted">No discussions yet. Start one!</p>`;

    $("#dashboard-announcements").innerHTML =
      announcements
        .slice(0, 3)
        .map(item => {
          const date = shortDate(item.date);

          return `
            <div class="mini-announcement">
              <div class="announcement-date">
                <strong>${date.day}</strong>
                ${date.month}
              </div>

              <div>
                <h4>${escapeHTML(item.title)}</h4>

                <p>
                  ${escapeHTML(item.category)}
                  ·
                  ${escapeHTML(item.time || "Recently")}
                </p>
              </div>
            </div>
          `;
        })
        .join("") ||
      `<p class="muted">No updates yet.</p>`;

    const classes = (timetable.Monday || []).slice(0, 3);

    $("#dashboard-classes").innerHTML =
      classes
        .map(item => `
          <div class="next-class">
            <span class="class-time">
              ${escapeHTML(item.time.split(" – ")[0])}
            </span>

            <div>
              <strong>${escapeHTML(item.name)}</strong>
              <p>${escapeHTML(item.location)}</p>
            </div>
          </div>
        `)
        .join("") ||
      `<p class="muted">No sessions added.</p>`;
  }

  function updateStats() {
    $("#stat-posts").textContent =
      String(posts.length).padStart(2, "0");

    $("#stat-announcements").textContent =
      String(announcements.length).padStart(2, "0");

    $("#stat-classes").textContent =
      String((timetable.Monday || []).length).padStart(2, "0");

    $("#nav-post-count").textContent = posts.length;
  }

  function postCard(post) {
    const liked = likedPosts.includes(post.id);

    return `
      <article class="post-card"
        data-post-id="${escapeHTML(post.id)}">

        <div class="post-author-row">
          <div class="post-avatar">
            ${escapeHTML(post.initials || initials(post.author))}
          </div>

          <div class="post-author-info">
            <strong>${escapeHTML(post.author)}</strong>

            <span>
              ${escapeHTML(post.role || "Student")}
              ·
              ${escapeHTML(post.time || "Just now")}
            </span>
          </div>

          <span class="post-kind">
            ${post.kind === "question" ? "QUESTION" : "DISCUSSION"}
          </span>
        </div>

        <h3>${escapeHTML(post.title)}</h3>

        <p class="post-body">${escapeHTML(post.body)}</p>

        <div class="post-tags">
          <span>#${escapeHTML(post.category)}</span>

          ${
            post.kind === "question"
              ? "<span>#NeedHelp</span>"
              : ""
          }
        </div>

        <div class="post-actions">
          <button
            class="post-action like-action ${liked ? "liked" : ""}"
            data-action="like"
            data-id="${escapeHTML(post.id)}">

            ${liked ? "♥" : "♡"}
            <span>${post.likes}</span>
          </button>

          <button
            class="post-action"
            data-action="comment"
            data-id="${escapeHTML(post.id)}">

            ▤ <span>${post.comments.length} comments</span>
          </button>

          <button
            class="post-action share-action"
            data-action="share"
            data-id="${escapeHTML(post.id)}">

            ↗ Share
          </button>
        </div>
      </article>
    `;
  }

  function renderFeed() {
    const query = searchQuery.trim().toLowerCase();

    let filtered = posts.filter(post => {
      const matchesQuery =
        !query ||
        [
          post.title,
          post.body,
          post.author,
          post.category
        ].some(value =>
          String(value).toLowerCase().includes(query)
        );

      const matchesFilter =
        feedFilter === "all" ||
        (
          feedFilter === "trending" &&
          post.likes >= 15
        ) ||
        (
          feedFilter === "question" &&
          post.kind === "question"
        );

      return matchesQuery && matchesFilter;
    });

    const sort = $("#feed-sort").value;

    filtered.sort((a, b) => {
      if (sort === "popular") {
        return b.likes - a.likes;
      }

      return posts.indexOf(b) - posts.indexOf(a);
    });

    $("#feed-posts").innerHTML =
      filtered.map(postCard).join("");

    $("#feed-empty").classList.toggle(
      "hidden",
      filtered.length !== 0
    );
  }

  function renderAnnouncements() {
    const query = searchQuery.trim().toLowerCase();

    const filtered = announcements.filter(item => {
      const matchesCategory =
        announcementFilter === "All" ||
        item.category === announcementFilter;

      const matchesQuery =
        !query ||
        [item.title, item.body, item.category]
          .some(value =>
            value.toLowerCase().includes(query)
          );

      return matchesCategory && matchesQuery;
    });

    $("#announcement-count").textContent =
      `${filtered.length} update${filtered.length === 1 ? "" : "s"}`;

    $("#announcement-list").innerHTML =
      filtered
        .map(item => `
          <article class="announcement-card">
            <div class="announcement-card-top">
              <span class="category-badge">
                ${escapeHTML(item.category)}
              </span>

              <span class="priority-badge ${String(item.priority).toLowerCase()}">
                ${escapeHTML(item.priority || "Normal")}
              </span>
            </div>

            <h3>${escapeHTML(item.title)}</h3>

            <p>${escapeHTML(item.body)}</p>

            <div class="announcement-card-bottom">
              <span>
                ◷ ${escapeHTML(item.date || "Recently")}
                ·
                ${escapeHTML(item.time || "New")}
              </span>

              <button
                data-action="read-announcement"
                data-id="${escapeHTML(item.id)}">
                Read update ↗
              </button>
            </div>
          </article>
        `)
        .join("") ||
      `
        <div class="empty-state">
          <span>▤</span>
          <h3>No updates found</h3>
          <p>Try a different category or search.</p>
        </div>
      `;
  }

  function renderTimetable() {
    const days = Object.keys(timetable);

    if (!days.includes(selectedDay)) {
      selectedDay = days[0] || "Monday";
    }

    $("#day-tabs").innerHTML =
      days
        .map(day => `
          <button
            class="day-tab ${day === selectedDay ? "active" : ""}"
            data-day="${day}">

            <span>${day.slice(0, 3).toUpperCase()}</span>

            <strong>
              ${(timetable[day] || []).length} sessions
            </strong>
          </button>
        `)
        .join("");

    const sessions = timetable[selectedDay] || [];

    $("#day-class-count").textContent = sessions.length;

    $("#timetable-rows").innerHTML =
      sessions.length
        ? sessions
            .map((item, index) => `
              <div class="timetable-row">
                <span class="time">
                  ${escapeHTML(item.time)}
                </span>

                <div>
                  <strong>${escapeHTML(item.name)}</strong>
                </div>

                <span class="location">
                  ${escapeHTML(item.location)}
                </span>

                <span class="type-pill">
                  ${escapeHTML(item.type)}

                  <button
                    class="row-delete"
                    data-action="delete-session"
                    data-day="${selectedDay}"
                    data-index="${index}"
                    aria-label="Delete session">
                    ×
                  </button>
                </span>
              </div>
            `)
            .join("")
        : `
          <div class="empty-state">
            <span>▦</span>
            <h3>A little breathing room.</h3>
            <p>No sessions planned. Add one to personalise your timetable.</p>
          </div>
        `;
  }

  function renderProfile() {
    if (!user) return;

    $("#profile-name").textContent =
      user.name || "Campus Student";

    $("#profile-email").textContent =
      user.email || "student@nsut.ac.in";

    $("#profile-avatar").textContent =
      initials(user.name)[0] || "S";

    $("#profile-role-badge").textContent =
      (user.role || "student").toUpperCase();

    $("#profile-branch").textContent =
      user.branch || "Computer Science & Engineering";

    $("#profile-year").textContent =
      user.year || "2nd Year";

    $("#profile-bio").textContent =
      user.bio || "Here to learn, build, and connect.";

    $("#profile-post-count").textContent =
      `${posts.filter(post => post.author === user.name).length} posts`;

    $("#profile-like-count").textContent =
      `${likedPosts.length} likes`;
  }

  // ------------------------------
  // COMMENTS
  // ------------------------------

  function openComments(id) {
    activeCommentPost = posts.find(
      post => post.id === id
    );

    if (!activeCommentPost) return;

    $("#comment-modal-title").textContent =
      activeCommentPost.title;

    renderComments();
    openModal("comment-modal");
  }

  function renderComments() {
    const comments = activeCommentPost?.comments || [];

    $("#comment-thread").innerHTML =
      comments.length
        ? comments
            .map(comment => `
              <div class="comment-item">
                <strong>${escapeHTML(comment.author)}</strong>

                <span>
                  ${escapeHTML(comment.time || "Just now")}
                </span>

                <p>${escapeHTML(comment.text)}</p>
              </div>
            `)
            .join("")
        : `
          <p class="no-comments">
            No comments yet. Be the first to join the conversation.
          </p>
        `;
  }

  $("#login-form").addEventListener("submit", event => {
    event.preventDefault();

    const name = $("#login-name").value.trim();
    const email = $("#login-email").value.trim();
    const role = $("#login-role").value;

    if (
      !name ||
      !email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      toast("Enter a name and a valid email address.");
      return;
    }

    user = {
      name,
      email,
      role,
      branch: "Computer Science & Engineering",
      year: "2nd Year",
      bio: "Here to learn, build, and connect."
    };

    save(STORAGE.user, user);
    enterApp();

    toast(
      `Welcome to NSUT Connect, ${name.split(/\s+/)[0]}!`
    );
  });

  $("#logout-btn").addEventListener("click", signOut);

  $("#theme-toggle").addEventListener("click", () => {
    setTheme(
      document.body.classList.contains("light")
        ? "dark"
        : "light"
    );
  });

  $("#top-theme-toggle").addEventListener("click", () => {
    setTheme(
      document.body.classList.contains("light")
        ? "dark"
        : "light"
    );
  });

  document.addEventListener("click", event => {
    const pageButton = event.target.closest("[data-page]");

    if (pageButton) {
      event.preventDefault();
      goToPage(pageButton.dataset.page);
    }

    const closeButton =
      event.target.closest("[data-close-modal]");

    if (closeButton) {
      closeModals();
    }

    if (event.target.classList.contains("modal-backdrop")) {
      closeModals();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeModals();
    }
  });

  $("#global-search").addEventListener("input", event => {
    searchQuery = event.target.value;

    if (currentPage === "feed") {
      renderFeed();
    }

    if (currentPage === "announcements") {
      renderAnnouncements();
    }

    if (searchQuery && currentPage === "dashboard") {
      goToPage("feed");
      $("#global-search").value = searchQuery;
      renderFeed();
    }
  });

  $("#open-post-modal").addEventListener("click", () => {
    openModal("post-modal");
  });

  $("#post-form").addEventListener("submit", event => {
    event.preventDefault();

    const title = $("#post-title").value.trim();
    const body = $("#post-body").value.trim();

    if (!title || !body) return;

    posts.unshift({
      id: `p${Date.now()}`,
      author: user?.name || "Campus Student",
      initials: initials(user?.name),
      role:
        user?.role === "admin"
          ? "Campus admin"
          : `${user?.year || "Student"} · ${user?.branch || "NSUT"}`,
      title,
      body,
      category: $("#post-category").value,
      kind: $("#post-kind").value,
      time: "Just now",
      likes: 0,
      comments: []
    });

    save(STORAGE.posts, posts);

    $("#post-form").reset();
    closeModals();

    feedFilter = "all";

    $$(".filter-tab[data-filter]").forEach(tab => {
      tab.classList.toggle(
        "active",
        tab.dataset.filter === "all"
      );
    });

    renderFeed();
    updateStats();
    renderDashboard();
    renderProfile();

    goToPage("feed");

    toast("Your discussion is live in this demo.");
  });

  $$(".filter-tab[data-filter]").forEach(tab => {
    tab.addEventListener("click", () => {
      feedFilter = tab.dataset.filter;

      $$(".filter-tab[data-filter]").forEach(item => {
        item.classList.toggle("active", item === tab);
      });

      renderFeed();
    });
  });

  $("#feed-sort").addEventListener("change", renderFeed);

  $$(".tag-cloud button").forEach(button => {
    button.addEventListener("click", () => {
      const tag = button.dataset.tag;

      searchQuery = tag;
      $("#global-search").value = tag;

      goToPage("feed");
      renderFeed();
    });
  });

  $("#feed-posts").addEventListener("click", event => {
    const button = event.target.closest("[data-action]");

    if (!button) return;

    const post = posts.find(
      item => item.id === button.dataset.id
    );

    if (!post) return;

    if (button.dataset.action === "like") {
      if (likedPosts.includes(post.id)) {
        likedPosts = likedPosts.filter(
          id => id !== post.id
        );

        post.likes = Math.max(0, post.likes - 1);
      } else {
        likedPosts.push(post.id);
        post.likes += 1;
      }

      save(STORAGE.likes, likedPosts);
      save(STORAGE.posts, posts);

      renderFeed();
      renderDashboard();
      renderProfile();
    }

    if (button.dataset.action === "comment") {
      openComments(post.id);
    }

    if (button.dataset.action === "share") {
      const text = `${post.title}\n${post.body}`;

      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text)
          .then(() => toast("Discussion copied to clipboard."))
          .catch(() => toast("Copy isn't available in this browser."));
      } else {
        toast("Select and copy the discussion text to share it.");
      }
    }
  });

  $("#comment-form").addEventListener("submit", event => {
    event.preventDefault();

    const text = $("#comment-input").value.trim();

    if (!text || !activeCommentPost) return;

    activeCommentPost.comments.push({
      author: user?.name || "Campus Student",
      text,
      time: "Just now"
    });

    save(STORAGE.posts, posts);

    $("#comment-input").value = "";

    renderComments();
    renderFeed();
    renderDashboard();

    toast("Comment added.");
  });

  $$("#announcement-filters .filter-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      announcementFilter = tab.dataset.category;

      $$("#announcement-filters .filter-tab").forEach(item => {
        item.classList.toggle("active", item === tab);
      });

      renderAnnouncements();
    });
  });

  $("#announcement-list").addEventListener("click", event => {
    const button = event.target.closest(
      '[data-action="read-announcement"]'
    );

    if (!button) return;

    const item = announcements.find(
      entry => entry.id === button.dataset.id
    );

    if (item) {
      alert(
        `${item.title}\n\n${item.body}\n\n` +
        "Demo notice — confirm details from official college channels."
      );
    }
  });

  $("#admin-add-announcement").addEventListener("click", () => {
    if (user?.role === "admin") {
      openModal("announcement-modal");
    } else {
      toast("Admin demo mode only.");
    }
  });

  $("#announcement-form").addEventListener("submit", event => {
    event.preventDefault();

    if (user?.role !== "admin") {
      toast("Switch to Admin (demo) to publish updates.");
      return;
    }

    announcements.unshift({
      id: `a${Date.now()}`,
      title: $("#new-ann-title").value.trim(),
      body: $("#new-ann-body").value.trim(),
      category: $("#new-ann-category").value,
      priority: $("#new-ann-priority").value,
      date: "Oct 12",
      time: "Just now"
    });

    save(STORAGE.announcements, announcements);

    $("#announcement-form").reset();

    closeModals();
    renderAnnouncements();
    renderDashboard();
    updateStats();

    toast("Demo announcement published.");
  });

  $("#day-tabs").addEventListener("click", event => {
    const tab = event.target.closest("[data-day]");

    if (!tab) return;

    selectedDay = tab.dataset.day;

    renderTimetable();
  });

  $("#edit-timetable").addEventListener("click", () => {
    $("#session-day").value = selectedDay;

    openModal("timetable-modal");
  });

  $("#timetable-form").addEventListener("submit", event => {
    event.preventDefault();

    const day = $("#session-day").value;

    const session = {
      time: $("#session-time").value.trim(),
      name: $("#session-name").value.trim(),
      location: $("#session-location").value.trim(),
      type: $("#session-type").value
    };

    if (
      !session.time ||
      !session.name ||
      !session.location
    ) {
      return;
    }

    if (!timetable[day]) {
      timetable[day] = [];
    }

    timetable[day].push(session);
    selectedDay = day;

    save(STORAGE.timetable, timetable);

    $("#timetable-form").reset();

    closeModals();

    renderTimetable();
    renderDashboard();
    updateStats();

    toast("Session added to your timetable.");
  });

  $("#timetable-rows").addEventListener("click", event => {
    const button = event.target.closest(
      '[data-action="delete-session"]'
    );

    if (!button) return;

    const day = button.dataset.day;
    const index = Number(button.dataset.index);

    if (
      Number.isInteger(index) &&
      timetable[day]
    ) {
      timetable[day].splice(index, 1);

      save(STORAGE.timetable, timetable);

      renderTimetable();
      renderDashboard();
      updateStats();

      toast("Session removed.");
    }
  });

  $("#edit-profile-btn").addEventListener("click", () => {
    $("#edit-name").value = user?.name || "";
    $("#edit-email").value = user?.email || "";

    $("#edit-branch").value =
      user?.branch || "Computer Science & Engineering";

    $("#edit-year").value =
      user?.year || "2nd Year";

    $("#edit-bio").value = user?.bio || "";

    openModal("profile-modal");
  });

  $("#profile-form").addEventListener("submit", event => {
    event.preventDefault();

    user = {
      ...user,
      name: $("#edit-name").value.trim(),
      email: $("#edit-email").value.trim(),
      branch:
        $("#edit-branch").value.trim() || "Not specified",
      year: $("#edit-year").value,
      bio:
        $("#edit-bio").value.trim() ||
        "Here to learn, build, and connect."
    };

    save(STORAGE.user, user);

    $("#welcome-name").textContent =
      user.name.split(/\s+/)[0];

    $("#top-avatar").textContent =
      initials(user.name)[0] || "S";

    closeModals();

    renderProfile();

    toast("Profile updated.");
  });

  setTheme(load(STORAGE.theme, "dark"));

  if (user && user.name && user.email) {
    enterApp();
  }
})();
