#!/bin/bash
set -e  # 오류 발생 시 스크립트 종료

# --- 환경 변수 설정 ---
REMOTE_USER="onhz"
REMOTE_SERVER="220.116.96.179"
REMOTE_PORT="4342"
REMOTE_PATH="/Users/onhz/workspace/client_docker/app"

# 기본 SSH 키 경로 (예: id_rsa)
SSH_KEY="$HOME/.ssh/id_rsa"

# --- SSH 에이전트 시작 및 키 추가 ---
echo "SSH 에이전트 시작 중..."
eval "$(ssh-agent -s)"

echo "SSH 키 추가 중: ${SSH_KEY}"
ssh-add "${SSH_KEY}"

# --- 빌드 실행 ---
echo "yarn run build 실행 중..."
yarn run build

# --- 파일 전송 ---
echo "빌드 완료. dist 폴더와 ecoconfig.cjs 전송 시작..."

# dist 폴더 전송
scp -P ${REMOTE_PORT} -o StrictHostKeyChecking=no -r dist ${REMOTE_USER}@${REMOTE_SERVER}:${REMOTE_PATH}/

# ecoconfig.cjs 파일 전송
scp -P ${REMOTE_PORT} -o StrictHostKeyChecking=no ecosystem.config.cjs ${REMOTE_USER}@${REMOTE_SERVER}:${REMOTE_PATH}/config/

echo "전송 완료."

# --- SSH 에이전트 종료 ---
ssh-agent -k

# --- 모든 파일(dist, ecosystem.config.cjs)이 날라가서 docker 새로 띄워야할 때 사용! --