import { post, get, put, del, download } from './HttpHelper';

export function refreshToken(params, requestOptions = {}) {
  const refreshParams = {
    ...params,
    grant_type: 'refresh_token',
    client_id: process.env.QUASAR_CLIENT_ID,
    client_secret: process.env.QUASAR_CLIENT_SECRET
  };

  return post({
    path: 'oauth/token',
    params: refreshParams,
    markAsActivity: false,
    ...requestOptions
  });
}

export function login(params, requestOptions = {}) {
  const loginParams = {
    ...params,
    grant_type: 'password',
    client_id: process.env.QUASAR_CLIENT_ID,
    client_secret: process.env.QUASAR_CLIENT_SECRET
  };

  return post({
    path: 'oauth/token',
    params: loginParams,
    ...requestOptions
  });
}

export function profile({ bearerTokenOverride = null }) {
  return get({
    path: 'api/my-profile',
    markAsActivity: false,
    bearerTokenOverride
  });
}

export function register(params) {
  return post({ path: 'api/user/register', params });
}

export function userList(params) {
  return get({ path: 'api/user', params });
}

export function userDetail(id) {
  return get({ path: `api/user/${id}` });
}

export function userAll(params) {
  return get({ path: 'api/user/all', params });
}

export function userCreate(params) {
  return post({ path: 'api/user', params });
}

export function userUpdate(id, params) {
  return put({ path: `api/user/${id}`, params });
}

export function userDelete(id) {
  return del({ path: `api/user/${id}` });
}

export function userRestore(id) {
  return post({ path: `api/user/${id}/restore` });
}

export function userSyncRole(params) {
  return post({ path: 'api/user/syncRoles', params });
}

export function roleList(params) {
  return get({ path: 'api/role', params });
}

export function roleAll(params) {
  return get({ path: 'api/role/all', params });
}

export function roleDetail(id) {
  return get({ path: `api/role/${id}` });
}

export function roleCreate(params) {
  return post({ path: 'api/role', params });
}

export function roleUpdate(id, params) {
  return put({ path: `api/role/${id}`, params });
}

export function roleDelete(id) {
  return del({ path: `api/role/${id}` });
}

export function roleRestore(id) {
  return post({ path: `api/role/${id}/restore` });
}

export function roleSyncPermission(params) {
  return post({ path: 'api/role/syncPermission', params });
}

export function permissionList(params) {
  return get({ path: 'api/permission', params });
}

export function permissionAll(params) {
  return get({ path: 'api/permission/all', params });
}

export function permissionDetail(id) {
  return get({ path: `api/permission/${id}` });
}

export function permissionCreate(params) {
  return post({ path: 'api/permission', params });
}

export function permissionUpdate(id, params) {
  return put({ path: `api/permission/${id}`, params });
}

export function permissionDelete(id) {
  return del({ path: `api/permission/${id}` });
}

export function permissionRestore(id) {
  return post({ path: `api/permission/${id}/restore` });
}

export function permissionSyncRole(params) {
  return post({ path: 'api/permission/syncRole', params });
}

export function permissionSyncRoleList(params) {
  return permissionSyncRole(params);
}

export function permissionRoleList(params) {
  return permissionSyncRole(params);
}

export function knowledgeTreeList(params) {
  return get({ path: 'api/knowledge-tree', params });
}

export function knowledgeTreeDetail(id) {
  return get({ path: `api/knowledge-tree/${id}` });
}

export function knowledgeTreeDirektorat() {
  return get({ path: 'api/knowledge-tree/direktorat/list' });
}

export function knowledgeTreeById(params) {
  return get({ path: 'api/knowledge-tree/direktorat/id', params });
}

export function knowledgeTreeCreate(params) {
  return post({ path: 'api/knowledge-tree', params });
}

export function knowledgeTreeUpdate(id, params) {
  return put({ path: `api/knowledge-tree/${id}`, params });
}

export function knowledgeTreeDelete(id) {
  return del({ path: `api/knowledge-tree/${id}` });
}

export function knowledgeTreeParent(id) {
  return get({ path: `api/knowledge-tree/tree/${id}` });
}

export function knowledgeTreeExportExcel(id) {
  return download({ path: `api/knowledge-tree/export/excel/${id}` });
}

export function postList(params) {
  return get({ path: 'api/post' });
}

export function postDetail(id) {
  return get({ path: `api/post/${id}` });
}

export function postCreate(params) {
  return post({ path: 'api/post', params });
}

export function postForward(params) {
  return post({ path: 'api/post/forward', params });
}

export function postUpdate(id, params) {
  return put({ path: `api/post/${id}`, params });
}

export function postDelete(id) {
  return del({ path: `api/post/${id}` });
}

export function postFileCreate(params) {
  return post({ path: 'api/post-file', params });
}

export function postFileDelete(params, id) {
  return del({ path: `api/post-file/${id}`, params });
}

export function postLimitDelete(id_post, id_user) {
  return del({ path: `api/post-limit/${id_post}/${id_user}` });
}

export function postLinksCreate(params) {
  return post({ path: 'api/post-links', params });
}

export function postLinksDelete(id) {
  return del({ path: `api/post-links/${id}` });
}

export function SearchData(params) {
  return get({ path: 'api/search', params });
}

export function SearchDataAutocomplete(params) {
  return get({ path: 'api/search/autocomplete', params });
}

export function knowledgeList(params) {
  return get({ path: 'api/knowledge', params });
}

export function knowledgeDetail(id) {
  return get({ path: `api/knowledge/${id}` });
}

export function knowledgeCreate(params) {
  return post({ path: 'api/knowledge', params });
}

export function knowledgeUpdate(id, params) {
  return put({ path: `api/knowledge/${id}`, params });
}

export function knowledgeDelete(id) {
  return del({ path: `api/knowledge/${id}` });
}

export function channelList(params) {
  return get({ path: 'api/channel' });
}

export function channelDetail(id) {
  return get({ path: `api/channel/${id}` });
}

export function channelCreate(params) {
  return post({ path: 'api/channel', params });
}

export function channelUpdate(id, params) {
  return put({ path: `api/channel/${id}`, params });
}

export function channelDelete(id, params) {
  return del({ path: `api/channel/${id}`, params });
}

export function channelPostList(params) {
  return get({ path: 'api/channel-post' });
}

export function checkMember(id) {
  return get({ path: `api/channel/check/${id}` });
}

export function channelJoin(id, params) {
  return post({ path: `api/channel/join/${id}`, params });
}

export function channelJoinSuggest(id, params) {
  return post({ path: `api/channel/join_suggest/${id}`, params });
}

export function channelMember(id, params) {
  return get({ path: `api/channel/member/${id}`, params });
}

export function trainingList(params) {
  return get({ path: 'api/training', params });
}

export function trainingElearningList(params) {
  return get({ path: 'api/elearning/getallcourse', params });
}

export function trainingElearningDetail(params) {
  return get({ path: 'api/elearning/getdetailcourse', params });
}

// export function trainingElearningJourneyListContent(params) {
export function trainingElearningJourneyContent(params) {
  return get({ path: 'api/elearning/coursecontent', params });
}

// export function trainingElearningJourneyList(params) {
export function trainingElearningJourneyCompletion(params) {
  return get({ path: 'api/elearning/coursecompletion', params });
}

// export function trainingElearningJourneyList(params) {
export function trainingElearningJourneyCompletionStatus(params) {
  return get({ path: 'api/elearning/coursecompletionstatus', params });
}

export function trainingListCot(params) {
  return get({ path: 'api/training-cot/list', params });
}

export function trainingDetail(id) {
  return get({ path: `api/training/${id}` });
}

export function trainingRedirectLoad(id) {
  return get({ path: `api/training/load/${id}` });
}

export function trainingCreate(params) {
  return post({ path: 'api/training', params });
}

export function trainingUpdate(id, params) {
  return put({ path: `api/training/${id}`, params });
}

export function trainingDelete(id) {
  return del({ path: `api/training/${id}` });
}

export function trainingSummary(params) {
  return get({ path: 'api/training/summary', params });
}

export function trainingStatistikPegawai(params) {
  return get({ path: 'api/training/statistik/pegawai', params });
}

export function trainingStatistikPesertaPelatihan(params) {
  return get({ path: 'api/training/statistik/peserta_pelatihan', params });
}

export function trainingStatistikPeningkatanKompetensi(params) {
  return get({ path: 'api/training/statistik/peningkatan_kompetensi', params });
}

export function trainingStatistikMemenuhiDiklat(params) {
  return get({ path: 'api/training/statistik/memenuhi_diklat', params });
}

export function trainingStatistikPelatihanInternal(params) {
  return get({ path: 'api/training/statistik/pelatihan_internal', params });
}

export function trainingStatistikJamPelatihanInternal(params) {
  return get({ path: 'api/training/statistik/jam_pelatihan_internal', params });
}

export function trainingCancel(id, params) {
  return post({ path: `api/training/cancel_register/${id}`, params });
}

export function trainingEvents() {
  return get({ path: 'api/training/events' });
}

export function trainingParticipantDetail(id) {
  return get({ path: `api/training-participant/${id}` });
}

export function trainingParticipantUpdate(id, params) {
  return put({ path: `api/training-participant/${id}`, params });
}

export function trainingParticipantGetOtherByType(id, params) {
  return get({ path: `api/training-participant/other/${id}`, params });
}

export function trainingParticipantGetAll(id, params) {
  return get({ path: `api/training-participant/all/${id}`, params });
}

export function trainingParticipantGetReg(id, params) {
  return get({ path: `api/training-participant/reg/${id}`, params });
}

export function trainingParticipantGetAllDetail(id, params) {
  return get({ path: `api/training-participant/all-detail/${id}`, params });
}

export function trainingParticipantGetHistoryTraining(user_id, params) {
  return get({ path: `api/training-participant/history/${user_id}`, params });
}

export function participantList(params) {
  return get({ path: 'api/training-participant', params });
}

export function trainingFeedbackLoad(trainingId, pageId) {
  return get({ path: `api/training-feedback/load/${trainingId}/${pageId}` });
}

export function trainingFeedbackCheckPage(trainingId) {
  return get({ path: `api/training-feedback/check-page/${trainingId}` });
}

// export function trainingFeedbackCheckPoin(trainingId) {
//   return get({ path: `api/training-feedback/check-poin/${trainingId}` });
// }

export function trainingFeedbackCreate(params) {
  return post({ path: 'api/training-feedback/create', params });
}

export function poinTraining(params) {
  return get({ path: 'api/training-feedback/poin', params });
}

export function registerParticipant(params) {
  return post({ path: 'api/training-participant/register', params });
}

export function trainingRegister(id, params) {
  return post({ path: `api/training/register/${id}`, params });
}

export function trainingApproval(id, params) {
  return post({ path: `api/training/approval/${id}`, params });
}

export function trainingDirectorateSummary(params) {
  return get({ path: 'api/training/directorate/summary', params });
}

export function trainingReportParticipant(params) {
  return get({ path: 'api/training/report/participant', params });
}

export function trainingReportTraining(params) {
  return get({ path: 'api/training/report/training', params });
}

export function channelMemberCreate(params) {
  return post({ path: 'api/channel-member/', params });
}

export function channelMemberUpdate(id, params) {
  return put({ path: `api/channel-member/${id}`, params });
}

export function channelMemberDelete(id) {
  return del({ path: `api/channel-member/${id}` });
}

export function channelMemberConfirm(params) {
  return put({ path: 'api/channel-member/confirm/', params });
}

export function channelMemberPerson(id, params) {
  return get({ path: `api/channel-member/person/${id}`, params });
}

export function channelMemberLatest(params) {
  return put({ path: 'api/channel-member/latest/', params });
}

export function organizationUsers(params) {
  return get({ path: 'api/organization/users/tree', params });
}

export function organizationList(params) {
  return get({ path: 'api/organization', params });
}

export function organizationById(id) {
  return get({ path: `api/organization/${id}` });
}

export function organizationListDeputi(params) {
  return get({ path: 'api/organization/deputi', params });
}

export function fileUpload(params) {
  return post({ path: 'api/file', params, isMultipartForm: true });
}

export function fileUploadConv(params) {
  return post({ path: 'api/file/conv', params, isMultipartForm: true });
}

export function postConversationFile(params) {
  return post({ path: 'api/post-conversation-file', params });
}

export function fileDelete(id) {
  return del({ path: `api/file/${id}` });
}

export function fileUpdate(id, params) {
  return put({ path: `api/file/${id}`, params });
}

export function channelRequest(id, params) {
  return put({ path: `api/channel/request/${id}`, params });
}

export function profileDetail(id) {
  return get({ path: `api/profile/${id}` });
}

export function UserById(id) {
  return get({ path: `api/profile/detail/${id}` });
}

export function UserUk(id) {
  return get({ path: `api/profile/uk/${id}` });
}

export function UserAdmin(params) {
  return get({ path: 'api/profile/user/admin', params });
}

export function profileUpdate(id, params) {
  return put({ path: `api/profile/${id}`, params });
}

export function pointLevelList() {
  return get({ path: 'api/point-level' });
}

export function certificateCreate(params) {
  return post({ path: 'api/certificate/', params });
}

export function certificateUpdate(id, params) {
  return put({ path: `api/certificate/${id}`, params });
}

export function certificateDelete(id) {
  return del({ path: `api/certificate/${id}` });
}

export function CertificateById(params) {
  return get({ path: 'api/certificate/user', params });
}

export function CertificateApproval(id, params) {
  return post({ path: `api/certificate/approval/${id}`, params });
}

export function CertificateFileSupport(id) {
  return get({ path: `api/certificate/file-support/${id}` });
}

export function EventFileSupport(id) {
  return get({ path: `api/event/file-support/${id}` });
}

export function channelAccess(channelId, userId) {
  return get({
    path: `api/channel-member/access?channel_id=${channelId}&users_id=${userId}`
  });
}

export function pollParticipantCreate(params) {
  return post({ path: 'api/poll-participant/', params });
}

export function poollChoicePicture(params) {
  return post({
    path: 'api/poll-choice/upload',
    params,
    isMultipartForm: true
  });
}

export function expertiseList(params) {
  return get({ path: 'api/expertise', params });
}

export function expertiseDetail(id) {
  return get({ path: `api/expertise/${id}` });
}

export function expertiseCreate(params) {
  return post({ path: 'api/expertise', params });
}

export function expertiseUpdate(id, params) {
  return put({ path: `api/expertise/${id}`, params });
}

export function expertiseDelete(id) {
  return del({ path: `api/expertise/${id}` });
}

export function expertiseRestore(id) {
  return post({ path: `api/admin-expertises/${id}` });
}

export function checkExpertise(name) {
  return get({ path: `api/expertise/check_expertise/${name}` });
}

export function expertiseTopic(id) {
  return get({ path: `api/training-expertise-topic/show/${id}` });
}

export function expertiseTopicList(id) {
  return get({ path: `api/training-expertise-topic/${id}` });
}

export function trainingExpertiseList(id) {
  return get({ path: `api/training-expertise/${id}` });
}

export function notifList(params) {
  return get({ path: 'api/notification', params });
}

export function notifRead(id, params) {
  return put({ path: `api/notification/${id}`, params });
}

export function eventCreate(params) {
  return post({ path: 'api/event', params });
}

export function eventUpdate(id, params) {
  return put({ path: `api/event/${id}`, params });
}

export function eventAttendees(params) {
  return post({ path: 'api/event/attendees', params });
}

export function eventVerify(id, params) {
  return put({ path: `api/event/verify/${id}`, params });
}

export function eventDelete(id) {
  return del({ path: `api/event/${id}` });
}

export function eventAbsensiCreate(params) {
  return post({ path: 'api/event-absensi', params });
}

export function listAttendees(id, params) {
  return get({ path: `api/event/${id}`, params });
}

export function listEvents(params) {
  return get({ path: 'api/event', params });
}

export function postReport(params) {
  return post({ path: 'api/post/report', params });
}

export function poollCreate(params) {
  return post({ path: 'api/poll', params });
}

export function poollUpdate(id, params) {
  return put({ path: `api/poll/${id}`, params });
}

export function poollChoiceCreate(params) {
  return post({ path: 'api/poll-choice', params });
}

export function poollChoiceUpdate(id, params) {
  return put({ path: `api/poll-choice/${id}`, params });
}

export function poollChoiceDelete(id) {
  return del({ path: `api/poll-choice/${id}` });
}


export function postReactionCreate(params) {
  return post({ path: 'api/post-reaction', params });
}

export function postReactionDelete(id) {
  return del({ path: `api/post-reaction/${id}` });
}

export function postReactionByPost(id) {
  return get({ path: `api/post-reaction/by-post/${id}` });
}

export function messageMemberList() {
  return get({ path: 'api/message-participant/by-member' });
}

export function deleteMessageParticipant(params) {
  return del({ path: `api/message-participant/delete/${params}` });
}

export function updateUpdatedDate(message_id) {
  return post({ path: `api/message-participant/update-updated-date/${message_id}` });
}

export function messageListById(id) {
  return get({ path: `api/message-conversation/${id}` });
}

export function deleteMessageByUserId(id) {
  return get({ path: `api/message-conversation/delete/${id}` });
}

export function deleteMessageById(data) {
  return post({ path: `api/message-conversation/delete-by-id/${data.id}/${data.message_id}` });
}

export function ExportFeedback(id, params) {
  return download({ path: `api/export-feedback/${id}`, params });
}

export function ExportTrainingReport(params) {
  return download({ path: `api/export-training-report/${params}` });
}

export function undeleteMessageByUserId(id) {
  return get({ path: `api/message-conversation/undelete/${id}` });
}

export function exportTrainingToken() {
  return get({ path: 'api/export-training/token' });
}

export function exportTraining(params) {
  return download({ path: 'api/export-training/', params });
}

export function ExportParticipantReport(params) {
  return download({ path: 'api/export-participant-report', params });
}

export function ExportDirectorateReport(id, params) {
  return download({ path: `api/export-directorate-report/${id}`, params });
}

export function exportExpertiseToken() {
  return get({ path: 'api/export-expertise/token' });
}

export function exportExpertise(params) {
  return download({ path: 'api/export-expertise/', params });
}

export function postConversationList(params) {
  return get({ path: 'api/post-conversation', params });
}

export function postConversationCreate(params) {
  return post({ path: 'api/post-conversation', params });
}

export function postConversationDelete(id) {
  return del({ path: `api/post-conversation/${id}` });
}

export function postConversationUpdate(id, params) {
  return put({ path: `api/post-conversation/${id}`, params });
}

export function postConversationFileCreate(params) {
  return post({ path: 'api/post-conversation-file', params });
}

export function knowledgeConversationList(params) {
  return get({ path: 'api/knowledge-conversation', params });
}

export function knowledgeConversationCreate(params) {
  return post({ path: 'api/knowledge-conversation', params });
}

export function knowledgeConversationDelete(id) {
  return del({ path: `api/knowledge-conversation/${id}` });
}

export function knowledgeConversationUpdate(id, params) {
  return put({ path: `api/knowledge-conversation/${id}`, params });
}

export function knowledgeConversationFileCreate(params) {
  return post({ path: 'api/knowledge-conversation-file', params });
}

export function postMessageConversationClear(params) {
  return post({ path: 'api/message-conversation/clear', params });
}

export function messageConversationRead(id) {
  return post({ path: `api/message-conversation/read/${id}` });
}

export function postPrivateMessage(params) {
  return post({ path: 'api/message-conversation', params });
}

export function postPrivateMessageEvent(params) {
  return post({ path: 'api/message-conversation/event', params });
}

export function postCreateMessage(params) {
  return post({ path: 'api/message', params });
}

export function postCreateNewMessage(params) {
  return post({ path: 'api/message/new-message', params });
}

export function checkMessage(params) {
  return get({ path: 'api/message/check', params });
}

export function postCreateMessageParticipant(params) {
  return post({ path: 'api/message-participant', params });
}

export function getMessageParticipantByMessageId(params) {
  return post({ path: 'api/message-participant/participant', params });
}

export function eventHighlight(params) {
  return put({ path: 'api/event-highlight/', params });
}

export function listEventHighlight(params) {
  return get({ path: 'api/event-highlight/', params });
}

export function getPostChannelList(params) {
  return get({ path: 'api/post-channel', params });
}

export function popQuizList(params) {
  return get({ path: 'api/pop-quiz', params });
}

export function popQuizParticipantList(params) {
  return get({ path: 'api/pop-quiz-participant', params });
}

export function popQuizParticipantCreate(params) {
  return post({ path: 'api/pop-quiz-participant', params });
}

export function getPointActivity() {
  return get({ path: 'api/point-activity' });
}

export function getPointActivityByTag(tag) {
  return get({ path: `api/point-activity/${tag}` });
}

export function getPointHistory(params) {
  return get({ path: 'api/point-history', params });
}
export function createPointHistory(params) {
  return post({ path: 'api/point-history', params });
}

export function deletePointHistory(params) {
  return del({ path: 'api/point-history', params });
}

export function leaderboardDirektoratPointHistory(is_overall, params) {
  return get({ path: `api/point-history/leaderboard-direktorat/${is_overall}`, params });
}

export function leaderboardDirektoratPointHistoryById(id, is_overall, params) {
  return get({ path: `api/point-history/leaderboard-direktorat-id/${id}/${is_overall}`, params });
}

export function leaderboardMemberPointHistory(is_overall, params) {
  return get({ path: `api/point-history/leaderboard-member/${is_overall}`, params });
}

export function switchRole(role_id) {
  return get({ path: `api/switch-role/${role_id}` });
}

export function leaderboardMemberByOrgIdPointHistory(id) {
  return get({ path: `api/point-history/leaderboard-member-org-id/${id}` });
}

export function leaderboardMemberByMemberIdPointHistory(id) {
  // return get({ path: `api/point-history/leaderboard-member/${id}` });
  return get({ path: `api/point-history/leaderboard-member-id/${id}` });
}

export function leaderboardHistoriesByMemberIdPointHistory(id) {
  return get({ path: `api/point-history/leaderboard-histories/${id}` });
}

export function memberBadge() {
  return get({ path: 'api/point-history/badge-point' });
}

export function poinConfig() {
  return get({ path: 'api/point-config/list' });
}

export function trainingMethodList(params) {
  return get({ path: 'api/training-method', params });
}

export function trainingMethodDetail(id) {
  return get({ path: `api/training-method/${id}` });
}

export function trainingMethodCreate(params) {
  return post({ path: 'api/training-method', params });
}

export function trainingMethodUpdate(id, params) {
  return put({ path: `api/training-method/${id}`, params });
}

export function trainingMethodDelete(id) {
  return del({ path: `api/training-method/${id}` });
}

export function trainingMethodRestore(id) {
  return post({ path: `api/training-method/${id}` });
}

export function trainingEmailList(params) {
  return get({ path: 'api/training-email', params });
}

export function trainingEmailDetail(id) {
  return get({ path: `api/training-email/${id}` });
}

export function trainingEmailCreate(params) {
  return post({ path: 'api/training-email', params });
}

export function trainingEmailUpdate(id, params) {
  return put({ path: `api/training-email/${id}`, params });
}

export function trainingEmailDelete(id) {
  return del({ path: `api/training-email/${id}` });
}

export function trainingEmailRestore(id) {
  return post({ path: `api/training-email/${id}` });
}

export function trainingTypeList(params) {
  return get({ path: 'api/training-type', params });
}

export function trainingTypeDetail(id) {
  return get({ path: `api/training-type/${id}` });
}

export function trainingTypeCreate(params) {
  return post({ path: 'api/training-type', params });
}

export function trainingTypeUpdate(id, params) {
  return put({ path: `api/training-type/${id}`, params });
}

export function trainingTypeDelete(id) {
  return del({ path: `api/training-type/${id}` });
}

export function trainingTypeRestore(id) {
  return post({ path: `api/training-type/${id}` });
}

export function trainingCategoryList(params) {
  return get({ path: 'api/training-category', params });
}

export function trainingCategoryDetail(id) {
  return get({ path: `api/training-category/${id}` });
}

export function trainingCategoryCreate(params) {
  return post({ path: 'api/training-category', params });
}

export function trainingCategoryUpdate(id, params) {
  return put({ path: `api/training-category/${id}`, params });
}

export function trainingCategoryDelete(id) {
  return del({ path: `api/training-category/${id}` });
}

export function trainingCategoryRestore(id) {
  return post({ path: `api/training-category/${id}` });
}

export function fileOriName(params) {
  return download({ path: 'api/file/original', params });
}

export function postPinList(params) {
  return get({ path: 'api/post-pin', params });
}

export function postPinCreate(params) {
  return post({ path: 'api/post-pin', params });
}

export function postPinDelete(id) {
  return del({ path: `api/post-pin/${id}` });
}

export function postBookmarkList(params) {
  return get({ path: 'api/bookmark', params });
}

export function postBookmarkCreate(params) {
  return post({ path: 'api/bookmark', params });
}

export function postBookmarkDelete(id) {
  return del({ path: `api/bookmark/${id}` });
}

export function userGetByNIP(params) {
  return post({ path: 'api/profile', params });
}

export function ratingAppList(params) {
  return get({ path: 'api/ratingapp/list', params });
}

export function ratingApp() {
  return get({ path: 'api/ratingapp' });
}

export function ratingAppCreate(params) {
  return post({ path: 'api/ratingapp/create', params });
}

export function getsGuidelines() {
  return get({ path: 'api/guidelines' });
}

export function getGuidelines(params) {
  return get({ path: `api/guidelines/${params}` });
}

export function getPdf(params) {
  return download({ path: `api/guidelines/get-pdf/${params}` });
}

export function postGuidelines(params) {
  return post({ path: 'api/guidelines', params });
}

export function putGuidelines(params) {
  return put({ path: `api/guidelines/${params.id}`, params });
}

export function deleteGuidelines(params) {
  return del({ path: `api/guidelines/${params.id}` });
}

export function getAtasanUser(params) {
  return get({ path: 'api/atasan-user', params });
}

export function createPostAccess(params) {
  return post({ path: 'api/post-access', params });
}

export function highlightCreate(params) {
  return post({ path: 'api/highlight', params });
}

export function highlightList(params) {
  return get({ path: 'api/highlight', params });
}

export function nonEmployeeList(params) {
  return get({ path: 'api/non-employee', params });
}

export function nonEmployeeDetail(id) {
  return get({ path: `api/non-employee/${id}` });
}

export function nonEmployeeCreate(params) {
  return post({ path: 'api/non-employee', params });
}

export function nonEmployeeUpdate(id, params) {
  return put({ path: `api/non-employee/${id}`, params });
}

export function nonEmployeeDelete(id) {
  return del({ path: `api/non-employee/${id}` });
}

export function nonEmployeeRestore(id) {
  return post({ path: `api/non-employee/${id}` });
}

export function profileSyncToHris(params) {
  return get({ path: 'api/profile/sync/hris', params });
}

export function userSubmitDuration(params) {
  return post({ path: 'api/user/submit-duration', params });
}

export function userSubmitDevice(params) {
  return post({ path: 'api/user/submit-device', params });
}

export function analyticsTotalUser(params) {
  return post({ path: 'api/analytics/audience-total-user', params });
}

export function analyticsDurationPerSession(params) {
  return post({ path: 'api/analytics/audience-duration-per-session', params });
}

export function analyticsChartTotalUser(params) {
  return post({ path: 'api/analytics/audience-chart-total-user', params });
}

export function analyticsChartAge(params) {
  return post({ path: 'api/analytics/audience-chart-age', params });
}

export function analyticsChartGender(params) {
  return post({ path: 'api/analytics/audience-chart-gender', params });
}

export function analyticsChartDevice(params) {
  return post({ path: 'api/analytics/audience-chart-device', params });
}

export function analyticsChartEducation(params) {
  return post({ path: 'api/analytics/audience-chart-education', params });
}

export function analyticsListOnlineUser(params) {
  return post({ path: 'api/analytics/audience-list-online-user', params });
}

export function analyticsListSummary(params) {
  return post({ path: 'api/analytics/kmap-list-summary', params });
}

export function analyticsListByKnowledge(params) {
  return post({ path: 'api/analytics/kmap-list-by-knowledge', params });
}

export function analyticsListBySme(params) {
  return post({ path: 'api/analytics/kmap-list-by-sme', params });
}

export function analyticsSummaryChannel(params) {
  return post({ path: 'api/analytics/content-summary-channel', params });
}

export function analyticsSummaryPost(params) {
  return post({ path: 'api/analytics/content-summary-post', params });
}

export function analyticsListPopularPost(params) {
  return post({ path: 'api/analytics/content-list-popular-post', params });
}

export function urlCertificateTraining(params) {
  return get({ path: 'api/file/certificate', params });
}

export function postCertificateTrainingPublic(params) {
  return get({ path: 'api/file/certificate/public', params });
}

export function getTrainingParticipantCertificateCheck(id) {
  return get({ path: `api/training-participant/certificate/check/${id}` });
}

export function participantApproval(params) {
  return post({ path: 'api/training-participant/approval', params });
}

export function delCertificateTrainingPublic(params) {
  return del({ path: 'api/file/certificate/public', params });
}

export function organizationListCustom(params) {
  return get({ path: 'api/organization/list/custom', params });
}

export function getListMedia(params) {
  return get({ path: 'api/media/list-media', params });
}

export function getListDocs(params) {
  return get({ path: 'api/media/list-docs', params });
}

export function getListDelete(params) {
  return get({ path: 'api/media/list-delete', params });
}

export function getListExpertiseRequest(params) {
  return get({ path: 'api/action/list-expertise-request', params });
}

export function getListKnowledgeRequest(params) {
  return get({ path: 'api/action/list-knowledge-request', params });
}
export function getListFile(params) {
  return get({ path: 'api/file/list-by-id', params });
}

export function getListPost(params) {
  return get({ path: 'api/post/list-by-id', params });
}
export function postProfileRequestJabatan(params) {
  return post({ path: 'api/profile/request/jabatan', params });
}

export function postProfileRequestJabatanConfirm(id, params) {
  return post({ path: `api/profile/request/jabatan/confirm/${id}`, params });
}

export function getProfileRequestJabatanList(params) {
  return get({ path: 'api/profile/request/jabatan/list', params });
}

export function organizationListTraining(params) {
  return get({ path: 'api/organization/list/training', params });
}

export function getListParticipantRequest(params) {
  return get({ path: 'api/action/list-participant-request', params });
}

export function getListProfileRequest(params) {
  return get({ path: 'api/action/list-profile-request', params });
}

export function PreviewParticipantReport(params) {
  return get({ path: 'api/export-participant-report/report-preview', params });
}

export function PreviewDirectorateReport(id, params) {
  return get({ path: `api/export-directorate-report/report-preview/${id}`, params });
}

export function PreviewTrainingReport(id, params) {
  return get({ path: `api/export-training-report/report-preview/${id}`, params });
}

export function PreviewFeedbackReport(id, params) {
  return get({ path: `api/export-feedback/report-preview/${id}`, params });
}

export function PreviewTrainingsReport(params) {
  return get({ path: 'api/export-training/report-preview/', params });
}

export function channelSuggestList() {
  return get({ path: 'api/channel-suggest' });
}

export function channelSuggestDashboardList() {
  return get({ path: 'api/channel-suggest-dashboard' });
}

export function expertDashboardList() {
  return get({ path: 'api/expert/dashboard' });
}

export function libraryList(params) {
  return get({ path: 'api/library', params });
}

export function libraryDetail(id, params) {
  return get({ path: `api/library/${id}`, params });
}
