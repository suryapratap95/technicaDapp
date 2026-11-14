# Cursor for Practical Engineering Workflows
## Instructor notes and learner brief

### Workshop goal
Use Cursor as an engineering assistant inside a disciplined software workflow—not just as a code generator. Participants should leave knowing how to give the agent reliable project context, delegate repeatable work, verify changes, and improve the development loop safely.

---

## 1. Start with the PRD in Plan Mode

- **Put the PRD in context before asking Cursor to plan.** Open or attach the PRD in the chat, or reference it explicitly (for example, `@PRD.md`). If it is long, identify the relevant section and acceptance criteria.
- **Ask for a plan, not code, first.** Have Cursor summarize the goal, identify the code paths it expects to touch, list assumptions and risks, and propose implementation and test steps.
- **Check the plan against the PRD.** Confirm that required behavior, constraints, non-goals, security considerations, and acceptance criteria are represented. Correct omissions before implementation.
- **Keep the plan reviewable.** Save the approved plan in the project when it will help teammates or a future session. Plan Mode is useful for substantial or uncertain work; skip ceremony for a tiny, obvious change.
- **Teaching point:** A plan is a hypothesis. It should be checked against the repository and PRD, then updated if exploration shows a different implementation path.

## 2. Rules: stable context and guardrails

### Project rules
- Stored with the codebase, commonly under `.cursor/rules/` as `.mdc` files; they can be scoped to all work, selected files, or agent-selected relevance.
- Use them for repository-specific conventions: architecture, folder boundaries, commands actually used by the project, testing expectations, security rules, and definition of done.
- Keep rules short and actionable. Add a rule when the agent repeatedly makes the same mistake; avoid copying the entire handbook or documenting obvious tool usage.
- Commit project rules so the team shares the same guidance.

### User rules
- Personal/global instructions for the individual’s Cursor environment; useful for preferences that should follow the user between repositories.
- Examples: preferred explanation level, ask before broad refactors, do not claim tests passed unless actually run, and avoid changing unrelated files.
- Don’t put team architecture or repository-specific commands in personal rules; other collaborators will not automatically share them.

### Rule authoring exercise
- Ask Cursor to create a rule from a concrete repeated need (the `/create-rule` workflow is available in current Cursor versions).
- Review its scope, wording, and file path. Verify it is loaded by testing a relevant task rather than assuming the file alone guarantees behavior.

## 3. Slash commands and reusable workflows

- Custom slash commands provide manually invoked, repeatable routines—such as `/plan-feature`, `/review-diff`, or `/prepare-pr`—so the user can trigger a known workflow instead of retyping the prompt.
- Use a command when the workflow is deliberate and user-triggered. Include inputs, steps, constraints, and expected output; don’t encode broad permanent facts in a command.
- Cursor’s customization model evolves: current versions also support Agent Skills, including built-in workflows and project skills. Skills can carry reusable instructions and supporting scripts/resources and may be selected when relevant. Prefer the current Cursor-supported mechanism for the installed version; avoid assuming old command-folder conventions are still current.
- Show both invoking a built-in slash workflow and creating a project-specific reusable workflow. Verify the actual command appears in the installed Cursor UI/version.

## 4. Skills and agents

- **Skills** package reusable knowledge or a multi-step capability that the agent can use when relevant. A skill should have a clear trigger, precise instructions, and only the supporting files it needs.
- **Agents/subagents** are focused workers with a defined responsibility—e.g., one inspects a bug, another proposes tests, or another reviews security. Give each a narrow task, relevant context, and a concrete deliverable.
- Delegate independent investigations in parallel; keep tightly coupled implementation steps with one agent to avoid conflicting edits.
- Review delegated findings and all generated diffs. Delegation changes who does the work, not who owns correctness.

## 5. Context7 MCP for current library documentation

- Context7 is an MCP-based documentation lookup service. When working with a library or framework whose APIs may have changed, ask Cursor to consult Context7’s current documentation before proposing code; identify the exact library/version where possible.
- Add a concise instruction to the relevant project rule or workflow, for example: *“For unfamiliar or version-sensitive framework/library APIs, consult Context7 MCP documentation before implementation; confirm the installed version and follow the repository’s existing patterns. If Context7 is unavailable, say so and use the library’s official docs rather than inventing APIs.”*
- Use it when current docs reduce uncertainty—not on every trivial task. MCP provides context and tool access; it does not guarantee the answer or replace tests.
- Verify Context7 is configured and reachable in the actual Cursor environment before class. Do not assume that naming it in a rule installs or enables the MCP server.

## 6. Hooks: deterministic automation around agent actions

- Hooks run configured scripts in response to supported agent lifecycle events. They are appropriate for predictable checks or policies, such as formatting, linting, recording an audit event, or warning before a risky operation.
- Keep hooks fast, narrowly scoped, and transparent. Document triggers, inputs, outputs, and failure behavior; test them on a safe change.
- Avoid hidden destructive side effects, slow full-suite runs on every keystroke, or relying on a hook as the only security control. Hooks can fail, be bypassed, or behave differently across environments.
- Review Cursor’s current hooks documentation and schema before writing `hooks.json`; event names and capabilities can change by version.

## 7. Test strategy: unit tests plus Playwright where appropriate

- **Unit tests** check small functions or components quickly and localize failures. Add tests for expected behavior, edge cases, and regressions around the changed logic.
- **Playwright tests** validate important end-to-end browser journeys—such as a user completing a form, seeing validation, and confirming saved state. Choose a few high-value journeys rather than duplicating every unit test in a browser.
- Ask Cursor to identify the existing test framework and conventions before adding dependencies or a new test structure.
- Run focused tests first, then relevant broader checks. Report exactly which commands ran and their real outcomes; don’t say “all tests pass” when only a subset was executed.
- Keep browser tests stable: use deterministic test data, robust selectors, isolated state, and avoid unnecessary sleeps.

## 8. Semantic commits, PRs, and Bugbot

- Make coherent commits before opening a PR. A semantic/conventional commit message names the type and purpose, for example `feat: add customer search`, `fix: handle expired session`, `test: cover invoice retries`, or `docs: clarify local setup`.
- Keep commits reviewable and avoid bundling unrelated cleanup with the feature. Inspect `git status` and the diff before committing; never include secrets or generated artifacts accidentally.
- Before creating the PR, run the project’s relevant tests and checks, inspect the final diff, and write a useful summary plus test evidence.
- Use Bugbot (if enabled for the repo/account) as an additional automated PR review. Treat its comments as findings to investigate, not unquestionable truth; fix valid issues, explain false positives, and rerun checks after changes.
- Do not claim the PR is clean or merged without checking its current status and CI results.

## 9. High-leverage engineering improvements

These are good agent-assisted tasks because a small, targeted change can improve the whole team’s feedback loop. Measure before and after; don’t optimize by guesswork.

- **Speed up the test suite:** inspect duration reports, parallelize safe tests, remove redundant setup, use focused test selection, and improve fixtures. Preserve coverage and determinism; faster but flaky or weaker tests are not an improvement.
- **Trim the dependency tree:** find unused, duplicated, oversized, or vulnerable dependencies; check transitive dependencies and actual bundle/runtime impact. Remove one change at a time and run compatibility/security tests.
- **Optimize CI:** identify bottlenecks from job timings; cache dependencies safely, avoid repeated installs, parallelize independent jobs, and run the right checks at the right stage. Ensure cache keys invalidate correctly and required checks cannot be skipped.
- **Reduce build times:** profile build steps, remove duplicated work, improve incremental builds and caching, and avoid unnecessary code generation. Record a baseline and compare the same command/environment after changes.
- **General method:** baseline → inspect evidence → propose smallest change → implement → test → compare metrics → document trade-offs.

## 10. Cursor Directory as a reference

- [Cursor Directory](https://cursor.directory/) is a community directory for Cursor plugins and shared configurations. It can be useful for inspiration or finding a starting point.
- It is not the authoritative Cursor documentation. Review the source, permissions, scripts, MCP endpoints, maintainer activity, and security implications before installing community content.
- Prefer official Cursor documentation for supported formats and behavior; treat third-party rules/plugins as untrusted code until inspected.

---

## Suggested 2-hour class flow

- **0–10 min — Orientation:** Cursor’s role in an engineering workflow; agree that agents propose changes and humans verify them.
- **10–25 min — PRD to plan:** attach a short PRD, enter Plan Mode, critique the generated plan against acceptance criteria.
- **25–40 min — Rules:** distinguish project rules from user rules; create a scoped rule and verify its effect.
- **40–55 min — Commands, skills, agents:** invoke a reusable workflow, discuss when a skill or focused subagent is more suitable.
- **55–65 min — Context7 MCP:** look up a version-sensitive API; inspect the returned docs and verify setup.
- **65–75 min — Hooks:** inspect a simple safe hook; explain trigger and failure behavior.
- **75–100 min — Testing:** implement a small change; add a unit test and one appropriate Playwright journey; run and inspect results.
- **100–112 min — PR discipline:** semantic commit, final diff, PR summary, and Bugbot review findings.
- **112–120 min — High-leverage opportunities:** choose one test/CI/build/dependency metric to measure and improve next.

## Before-class checklist

- Confirm Cursor version, repository access, test commands, Playwright availability, and whether Bugbot is enabled.
- Prepare a small practice repository or safe feature; avoid production data and credentials.
- Confirm Context7 MCP is installed and usable if it will be shown live.
- Prepare a short PRD, one existing failing/slow test or build baseline, and a branch participants can modify.
- Have a fallback prepared: screenshots or a recorded result if an account feature, integration, or network dependency is unavailable.

## Quick vocabulary

- **PRD:** product requirements document describing user problem, scope, behavior, constraints, and acceptance criteria.
- **MCP:** Model Context Protocol, a standard way for an AI client to connect to external tools/data sources.
- **Semantic commit:** a commit message using a recognizable type and concise intent.
- **Bugbot:** automated code-review assistant for PRs; availability depends on repository/account configuration.
- **High leverage:** a change that measurably improves reliability, speed, maintainability, or team throughput beyond one local code edit.

## Reference links

- Cursor Rules: https://cursor.com/docs/rules
- Cursor Skills: https://cursor.com/docs/skills
- Cursor Hooks: https://cursor.com/docs/hooks
- Cursor agent best practices / Plan Mode: https://cursor.com/blog/agent-best-practices
- Cursor Directory (community): https://cursor.directory/
